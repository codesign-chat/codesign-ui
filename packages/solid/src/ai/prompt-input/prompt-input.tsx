import { createContext, createSignal, onCleanup, splitProps, useContext } from 'solid-js'
import type { JSX } from 'solid-js'
import { Tooltip } from '../../components/tooltip/index.ts'

const SCOPE = 'prompt-input'

const createId = () => crypto.randomUUID()

export interface AttachmentItem {
  filename: string
  id: string
  mediaType: string
  type: 'file'
  url: string
}

export interface PromptInputMessage {
  files: { filename: string; mediaType: string; type: 'file'; url: string }[]
  text: string
}

export interface AttachmentsContextValue {
  add: (files: File[] | FileList) => void
  clear: () => void
  files: AttachmentItem[]
  openFileDialog: () => void
  registerInput: (element: HTMLInputElement | undefined) => void
  remove: (id: string) => void
}

const AttachmentsContext = createContext<AttachmentsContextValue>()

export function usePromptInputAttachments(): AttachmentsContextValue {
  const context = useContext(AttachmentsContext)
  if (!context) {
    throw new Error('usePromptInputAttachments must be used within a PromptInput')
  }
  return context
}

const convertBlobUrlToDataUrl = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url)
    const blob = await response.blob()
    return await new Promise((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = () => resolve(null)
      reader.readAsDataURL(blob)
    })
  } catch {
    return null
  }
}

export type PromptInputProps = JSX.HTMLAttributes<HTMLFormElement> & {
  accept?: string
  globalDrop?: boolean
  maxFileSize?: number
  maxFiles?: number
  multiple?: boolean
  onError?: (err: { code: 'accept' | 'max_file_size' | 'max_files'; message: string }) => void
  onSubmit: (message: PromptInputMessage) => void | Promise<void>
}

export function PromptInput(props: PromptInputProps) {
  const [local, rest] = splitProps(props, [
    'accept',
    'globalDrop',
    'maxFileSize',
    'maxFiles',
    'multiple',
    'onError',
    'onSubmit',
    'children',
  ])
  let inputRef: HTMLInputElement | undefined

  const [files, setFiles] = createSignal<AttachmentItem[]>([])

  const matchesAccept = (file: File) => {
    if (!local.accept || local.accept.trim() === '') return true
    const patterns = local.accept
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    return patterns.some((pattern) =>
      pattern.endsWith('/*') ? file.type.startsWith(pattern.slice(0, -1)) : file.type === pattern,
    )
  }

  const validateFiles = (fileList: File[] | FileList): File[] | null => {
    const incoming = [...fileList]
    const accepted = incoming.filter(matchesAccept)
    if (incoming.length > 0 && accepted.length === 0) {
      local.onError?.({ code: 'accept', message: 'No files match the accepted types.' })
      return null
    }
    const sized = accepted.filter((file) => (local.maxFileSize ? file.size <= local.maxFileSize : true))
    if (accepted.length > 0 && sized.length === 0) {
      local.onError?.({ code: 'max_file_size', message: 'All files exceed the maximum size.' })
      return null
    }
    return sized
  }

  const add = (fileList: File[] | FileList) => {
    const sized = validateFiles(fileList)
    if (!sized) return
    setFiles((prev) => {
      const capacity = typeof local.maxFiles === 'number' ? Math.max(0, local.maxFiles - prev.length) : undefined
      const capped = typeof capacity === 'number' ? sized.slice(0, capacity) : sized
      if (typeof capacity === 'number' && sized.length > capacity) {
        local.onError?.({ code: 'max_files', message: 'Too many files. Some were not added.' })
      }
      return [
        ...prev,
        ...capped.map((file) => ({
          filename: file.name,
          id: createId(),
          mediaType: file.type,
          type: 'file' as const,
          url: URL.createObjectURL(file),
        })),
      ]
    })
  }

  const remove = (id: string) => {
    setFiles((prev) => {
      const found = prev.find((file) => file.id === id)
      if (found) URL.revokeObjectURL(found.url)
      return prev.filter((file) => file.id !== id)
    })
  }

  const clearAttachments = () => {
    setFiles((prev) => {
      for (const file of prev) URL.revokeObjectURL(file.url)
      return []
    })
  }

  const openFileDialog = () => inputRef?.click()

  onCleanup(() => {
    for (const file of files()) URL.revokeObjectURL(file.url)
  })

  const attachDropHandlers = (form: HTMLFormElement | undefined) => {
    if (!form || local.globalDrop) return
    const onDragOver = (event: DragEvent) => {
      if (event.dataTransfer?.types?.includes('Files')) event.preventDefault()
    }
    const onDrop = (event: DragEvent) => {
      if (event.dataTransfer?.types?.includes('Files')) event.preventDefault()
      if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) add(event.dataTransfer.files)
    }
    form.addEventListener('dragover', onDragOver)
    form.addEventListener('drop', onDrop)
    onCleanup(() => {
      form.removeEventListener('dragover', onDragOver)
      form.removeEventListener('drop', onDrop)
    })
  }

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault()
    const text = new FormData(event.currentTarget as HTMLFormElement).get('message')?.toString() ?? ''
    ;(event.currentTarget as HTMLFormElement).reset()
    try {
      const converted = await Promise.all(
        files().map(async ({ id: _id, ...item }) => {
          if (item.url.startsWith('blob:')) {
            return { ...item, url: (await convertBlobUrlToDataUrl(item.url)) ?? item.url }
          }
          return item
        }),
      )
      const result = local.onSubmit({ files: converted, text })
      if (result instanceof Promise) {
        try {
          await result
          clearAttachments()
        } catch {
          // keep state for retry
        }
      } else {
        clearAttachments()
      }
    } catch {
      // keep state for retry
    }
  }

  const contextValue: AttachmentsContextValue = {
    add,
    clear: clearAttachments,
    get files() {
      return files()
    },
    openFileDialog,
    registerInput: (element) => {
      inputRef = element
    },
    remove,
  }

  return (
    <AttachmentsContext.Provider value={contextValue}>
      <input
        accept={local.accept}
        aria-label="Upload files"
        hidden
        multiple={local.multiple}
        onChange={(event) => {
          if (event.currentTarget.files) add(event.currentTarget.files)
          event.currentTarget.value = ''
        }}
        ref={(element) => (inputRef = element)}
        type="file"
      />
      <form data-scope={SCOPE} data-part="root" ref={attachDropHandlers} {...rest} onSubmit={handleSubmit}>
        {local.children}
      </form>
    </AttachmentsContext.Provider>
  )
}

export type PromptInputBodyProps = JSX.HTMLAttributes<HTMLDivElement>

export function PromptInputBody(props: PromptInputBodyProps) {
  return <div data-scope={SCOPE} data-part="body" {...props} />
}

export type PromptInputTextareaProps = JSX.HTMLAttributes<HTMLTextAreaElement> & {
  placeholder?: string
}

export function PromptInputTextarea(props: PromptInputTextareaProps) {
  const [local, rest] = splitProps(props, ['children', 'onKeyDown', 'placeholder'])
  const attachments = usePromptInputAttachments()
  let isComposing = false

  return (
    <textarea
      data-scope={SCOPE}
      data-part="textarea"
      name="message"
      onCompositionEnd={() => (isComposing = false)}
      onCompositionStart={() => (isComposing = true)}
      onPaste={(event) => {
        const items = event.clipboardData?.items
        if (!items) return
        const pasted: File[] = []
        for (const item of items) {
          if (item.kind === 'file') {
            const file = item.getAsFile()
            if (file) pasted.push(file)
          }
        }
        if (pasted.length > 0) {
          event.preventDefault()
          attachments.add(pasted)
        }
      }}
      onKeyDown={(event) => {
        // solid handler unions (fn | bound | array) are not uniformly callable; forward the common fn case
        ;(local.onKeyDown as ((event: KeyboardEvent) => void) | undefined)?.(event)
        if (event.defaultPrevented) return
        if (event.key === 'Enter') {
          if (isComposing || event.isComposing || event.shiftKey) return
          event.preventDefault()
          const submitButton = event.currentTarget.form?.querySelector<HTMLButtonElement>('button[type="submit"]')
          if (submitButton?.disabled) return
          event.currentTarget.form?.requestSubmit()
        }
        if (event.key === 'Backspace' && event.currentTarget.value === '' && attachments.files.length > 0) {
          event.preventDefault()
          const last = attachments.files.at(-1)
          if (last) attachments.remove(last.id)
        }
      }}
      placeholder={local.placeholder ?? 'What would you like to know?'}
      {...rest}
    />
  )
}

export type PromptInputHeaderProps = JSX.HTMLAttributes<HTMLDivElement>

export function PromptInputHeader(props: PromptInputHeaderProps) {
  return <div data-scope={SCOPE} data-part="header" {...props} />
}

export type PromptInputFooterProps = JSX.HTMLAttributes<HTMLDivElement>

export function PromptInputFooter(props: PromptInputFooterProps) {
  return <div data-scope={SCOPE} data-part="footer" {...props} />
}

export type PromptInputToolsProps = JSX.HTMLAttributes<HTMLDivElement>

export function PromptInputTools(props: PromptInputToolsProps) {
  return <div data-scope={SCOPE} data-part="tools" {...props} />
}

export type PromptInputButtonProps = JSX.HTMLAttributes<HTMLButtonElement> & { tooltip?: string }

export function PromptInputButton(props: PromptInputButtonProps) {
  const [local, rest] = splitProps(props, ['children', 'tooltip'])
  return local.tooltip ? (
    <Tooltip.Root>
      <Tooltip.Trigger
        asChild={(triggerProps) => (
          <button {...triggerProps} type="button" data-scope={SCOPE} data-part="button" {...rest} />
        )}
      >
        {local.children}
      </Tooltip.Trigger>
      <Tooltip.Positioner>
        <Tooltip.Content data-scope={SCOPE} data-part="button-tooltip">
          {local.tooltip}
        </Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  ) : (
    <button type="button" data-scope={SCOPE} data-part="button" {...rest}>
      {local.children}
    </button>
  )
}

export type PromptInputSubmitProps = JSX.HTMLAttributes<HTMLButtonElement> & {
  onStop?: () => void
  status?: 'ready' | 'streaming' | 'submitted'
}

export function PromptInputSubmit(props: PromptInputSubmitProps) {
  const [local, rest] = splitProps(props, ['onStop', 'status', 'onClick', 'children'])
  const isGenerating = local.status === 'submitted' || local.status === 'streaming'

  return (
    <button
      type={isGenerating && local.onStop ? 'button' : 'submit'}
      aria-label={isGenerating ? 'Stop' : 'Submit'}
      data-scope={SCOPE}
      data-part="submit"
      data-status={local.status}
      onClick={(event) => {
        if (isGenerating && local.onStop) {
          event.preventDefault()
          local.onStop()
          return
        }
        ;(local.onClick as ((event: MouseEvent) => void) | undefined)?.(event)
      }}
      {...rest}
    >
      {local.children}
    </button>
  )
}
