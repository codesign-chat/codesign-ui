import type { ChatStatus, FileUIPart, SourceDocumentUIPart } from 'ai'
import type {
  ChangeEvent,
  ChangeEventHandler,
  ClipboardEventHandler,
  ComponentProps,
  FormEvent,
  FormEventHandler,
  HTMLAttributes,
  KeyboardEventHandler,
  PropsWithChildren,
  RefObject,
} from 'react'
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Menu } from '../../components/menu/index.ts'
import { Tooltip } from '../../components/tooltip/index.ts'

// ============================================================================
// Helpers
// ============================================================================

const createId = () => crypto.randomUUID()

const convertBlobUrlToDataUrl = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url)
    const blob = await response.blob()
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = () => resolve(null)
      reader.readAsDataURL(blob)
    })
  } catch {
    return null
  }
}

const captureScreenshot = async (): Promise<File | null> => {
  if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getDisplayMedia) {
    return null
  }

  let stream: MediaStream | null = null
  const video = document.createElement('video')
  video.muted = true
  video.playsInline = true

  try {
    stream = await navigator.mediaDevices.getDisplayMedia({
      audio: false,
      video: true,
    })

    video.srcObject = stream

    await new Promise<void>((resolve, reject) => {
      video.onloadedmetadata = () => resolve()
      video.onerror = () => reject(new Error('Failed to load screen stream'))
    })

    await video.play()

    const width = video.videoWidth
    const height = video.videoHeight
    if (!width || !height) {
      return null
    }

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const context = canvas.getContext('2d')
    if (!context) {
      return null
    }

    context.drawImage(video, 0, 0, width, height)
    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, 'image/png')
    })
    if (!blob) {
      return null
    }

    const timestamp = new Date().toISOString().replaceAll(/[:.]/g, '-').replace('T', '_').replace('Z', '')

    return new File([blob], `screenshot-${timestamp}.png`, {
      lastModified: Date.now(),
      type: 'image/png',
    })
  } finally {
    if (stream) {
      for (const track of stream.getTracks()) {
        track.stop()
      }
    }
    video.pause()
    video.srcObject = null
  }
}

// ============================================================================
// Provider Context & Types
// ============================================================================

export interface AttachmentsContext {
  files: (FileUIPart & { id: string })[]
  add: (files: File[] | FileList) => void
  remove: (id: string) => void
  clear: () => void
  openFileDialog: () => void
  fileInputRef: RefObject<HTMLInputElement | null>
}

export interface TextInputContext {
  value: string
  setInput: (v: string) => void
  clear: () => void
}

export interface PromptInputControllerProps {
  textInput: TextInputContext
  attachments: AttachmentsContext
  /** INTERNAL: allows PromptInput to register its file input + "open" callback */
  __registerFileInput: (ref: RefObject<HTMLInputElement | null>, open: () => void) => void
}

const PromptInputController = createContext<PromptInputControllerProps | null>(null)
const ProviderAttachmentsContext = createContext<AttachmentsContext | null>(null)

export function usePromptInputController() {
  const ctx = useContext(PromptInputController)
  if (!ctx) {
    throw new Error('Wrap your component inside <PromptInputProvider> to use usePromptInputController().')
  }
  return ctx
}

// Optional variants (do NOT throw). Useful for dual-mode components.
const useOptionalPromptInputController = () => useContext(PromptInputController)

export function useProviderAttachments() {
  const ctx = useContext(ProviderAttachmentsContext)
  if (!ctx) {
    throw new Error('Wrap your component inside <PromptInputProvider> to use useProviderAttachments().')
  }
  return ctx
}

const useOptionalProviderAttachments = () => useContext(ProviderAttachmentsContext)

export type PromptInputProviderProps = PropsWithChildren<{
  initialInput?: string
}>

/**
 * Optional global provider that lifts PromptInput state outside of PromptInput.
 * If you don't use it, PromptInput stays fully self-managed.
 */
export function PromptInputProvider({ initialInput: initialTextInput = '', children }: PromptInputProviderProps) {
  const [textInput, setTextInput] = useState(initialTextInput)
  const clearInput = useCallback(() => setTextInput(''), [])

  const [attachmentFiles, setAttachmentFiles] = useState<(FileUIPart & { id: string })[]>([])
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const openRef = useRef<() => void>(() => {})

  const add = useCallback((files: File[] | FileList) => {
    const incoming = [...files]
    if (incoming.length === 0) {
      return
    }

    setAttachmentFiles((prev) => [
      ...prev,
      ...incoming.map((file) => ({
        filename: file.name,
        id: createId(),
        mediaType: file.type,
        type: 'file' as const,
        url: URL.createObjectURL(file),
      })),
    ])
  }, [])

  const remove = useCallback((id: string) => {
    setAttachmentFiles((prev) => {
      const found = prev.find((f) => f.id === id)
      if (found?.url) {
        URL.revokeObjectURL(found.url)
      }
      return prev.filter((f) => f.id !== id)
    })
  }, [])

  const clear = useCallback(() => {
    setAttachmentFiles((prev) => {
      for (const f of prev) {
        if (f.url) {
          URL.revokeObjectURL(f.url)
        }
      }
      return []
    })
  }, [])

  const attachmentsRef = useRef(attachmentFiles)

  useEffect(() => {
    attachmentsRef.current = attachmentFiles
  }, [attachmentFiles])

  useEffect(
    () => () => {
      for (const f of attachmentsRef.current) {
        if (f.url) {
          URL.revokeObjectURL(f.url)
        }
      }
    },
    [],
  )

  const openFileDialog = useCallback(() => {
    openRef.current?.()
  }, [])

  const attachments = useMemo<AttachmentsContext>(
    () => ({
      add,
      clear,
      fileInputRef,
      files: attachmentFiles,
      openFileDialog,
      remove,
    }),
    [attachmentFiles, add, remove, clear, openFileDialog],
  )

  const __registerFileInput = useCallback((ref: RefObject<HTMLInputElement | null>, open: () => void) => {
    fileInputRef.current = ref.current
    openRef.current = open
  }, [])

  const controller = useMemo<PromptInputControllerProps>(
    () => ({
      __registerFileInput,
      attachments,
      textInput: {
        clear: clearInput,
        setInput: setTextInput,
        value: textInput,
      },
    }),
    [textInput, clearInput, attachments, __registerFileInput],
  )

  return (
    <PromptInputController.Provider value={controller}>
      <ProviderAttachmentsContext.Provider value={attachments}>{children}</ProviderAttachmentsContext.Provider>
    </PromptInputController.Provider>
  )
}

// ============================================================================
// Component Context & Hooks
// ============================================================================

const LocalAttachmentsContext = createContext<AttachmentsContext | null>(null)

export function usePromptInputAttachments() {
  // Prefer local context (inside PromptInput) as it has validation, fall back to provider
  const provider = useOptionalProviderAttachments()
  const local = useContext(LocalAttachmentsContext)
  const context = local ?? provider
  if (!context) {
    throw new Error('usePromptInputAttachments must be used within a PromptInput or PromptInputProvider')
  }
  return context
}

// ============================================================================
// Referenced Sources (Local to PromptInput)
// ============================================================================

export interface ReferencedSourcesContext {
  sources: (SourceDocumentUIPart & { id: string })[]
  add: (sources: SourceDocumentUIPart[] | SourceDocumentUIPart) => void
  remove: (id: string) => void
  clear: () => void
}

export const LocalReferencedSourcesContext = createContext<ReferencedSourcesContext | null>(null)

export function usePromptInputReferencedSources() {
  const ctx = useContext(LocalReferencedSourcesContext)
  if (!ctx) {
    throw new Error('usePromptInputReferencedSources must be used within a LocalReferencedSourcesContext.Provider')
  }
  return ctx
}

export type PromptInputActionAddAttachmentsProps = Omit<ComponentProps<typeof Menu.Item>, 'onSelect' | 'value'> & {
  label?: string
  onSelect?: () => void
}

export function PromptInputActionAddAttachments({
  label = 'Add photos and files',
  children,
  onSelect,
  ...props
}: PromptInputActionAddAttachmentsProps) {
  const attachments = usePromptInputAttachments()

  return (
    <Menu.Item
      value="add-attachments"
      {...props}
      onSelect={() => {
        attachments.openFileDialog()
        onSelect?.()
      }}
    >
      {children ?? label}
    </Menu.Item>
  )
}

export type PromptInputActionAddScreenshotProps = Omit<ComponentProps<typeof Menu.Item>, 'onSelect' | 'value'> & {
  label?: string
  onSelect?: () => void
}

export function PromptInputActionAddScreenshot({
  label = 'Take screenshot',
  children,
  onSelect,
  ...props
}: PromptInputActionAddScreenshotProps) {
  const attachments = usePromptInputAttachments()

  const handleSelect = useCallback(async () => {
    onSelect?.()
    try {
      const screenshot = await captureScreenshot()
      if (screenshot) {
        attachments.add([screenshot])
      }
    } catch (error) {
      if (error instanceof DOMException && (error.name === 'NotAllowedError' || error.name === 'AbortError')) {
        return
      }
      throw error
    }
  }, [onSelect, attachments])

  return (
    <Menu.Item value="add-screenshot" {...props} onSelect={() => handleSelect()}>
      {children ?? label}
    </Menu.Item>
  )
}

export interface PromptInputMessage {
  text: string
  files: FileUIPart[]
}

export type PromptInputProps = Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit' | 'onError'> & {
  // e.g. "image/*" or leave undefined for any
  accept?: string
  multiple?: boolean
  // When true, accepts drops anywhere on document. Default false (opt-in).
  globalDrop?: boolean
  // Minimal constraints
  maxFiles?: number
  // bytes
  maxFileSize?: number
  onError?: (err: { code: 'max_files' | 'max_file_size' | 'accept'; message: string }) => void
  onSubmit: (message: PromptInputMessage, event: FormEvent<HTMLFormElement>) => void | Promise<void>
}

export function PromptInput({
  accept,
  multiple,
  globalDrop,
  maxFiles,
  maxFileSize,
  onError,
  onSubmit,
  children,
  ...props
}: PromptInputProps) {
  // Try to use a provider controller if present
  const controller = useOptionalPromptInputController()
  const usingProvider = !!controller

  const inputRef = useRef<HTMLInputElement | null>(null)
  const formRef = useRef<HTMLFormElement | null>(null)

  // ----- Local attachments (only used when no provider)
  const [items, setItems] = useState<(FileUIPart & { id: string })[]>([])
  const files = usingProvider ? controller.attachments.files : items

  // ----- Local referenced sources (always local to PromptInput)
  const [referencedSources, setReferencedSources] = useState<(SourceDocumentUIPart & { id: string })[]>([])

  const filesRef = useRef(files)

  useEffect(() => {
    filesRef.current = files
  }, [files])

  const openFileDialogLocal = useCallback(() => {
    inputRef.current?.click()
  }, [])

  const matchesAccept = useCallback(
    (f: File) => {
      if (!accept || accept.trim() === '') {
        return true
      }

      const patterns = accept
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)

      return patterns.some((pattern) => {
        if (pattern.endsWith('/*')) {
          // e.g. image/* -> image/
          const prefix = pattern.slice(0, -1)
          return f.type.startsWith(prefix)
        }
        return f.type === pattern
      })
    },
    [accept],
  )

  const validateFiles = useCallback(
    (fileList: File[] | FileList) => {
      const incoming = [...fileList]
      const accepted = incoming.filter((f) => matchesAccept(f))
      if (incoming.length && accepted.length === 0) {
        onError?.({
          code: 'accept',
          message: 'No files match the accepted types.',
        })
        return null
      }
      const withinSize = (f: File) => (maxFileSize ? f.size <= maxFileSize : true)
      const sized = accepted.filter(withinSize)
      if (accepted.length > 0 && sized.length === 0) {
        onError?.({
          code: 'max_file_size',
          message: 'All files exceed the maximum size.',
        })
        return null
      }
      return sized
    },
    [matchesAccept, maxFileSize, onError],
  )

  const addLocal = useCallback(
    (fileList: File[] | FileList) => {
      const sized = validateFiles(fileList)
      if (!sized) {
        return
      }

      setItems((prev) => {
        const capacity = typeof maxFiles === 'number' ? Math.max(0, maxFiles - prev.length) : undefined
        const capped = typeof capacity === 'number' ? sized.slice(0, capacity) : sized
        if (typeof capacity === 'number' && sized.length > capacity) {
          onError?.({
            code: 'max_files',
            message: 'Too many files. Some were not added.',
          })
        }
        const next: (FileUIPart & { id: string })[] = []
        for (const file of capped) {
          next.push({
            filename: file.name,
            id: createId(),
            mediaType: file.type,
            type: 'file',
            url: URL.createObjectURL(file),
          })
        }
        return [...prev, ...next]
      })
    },
    [validateFiles, maxFiles, onError],
  )

  const removeLocal = useCallback(
    (id: string) =>
      setItems((prev) => {
        const found = prev.find((file) => file.id === id)
        if (found?.url) {
          URL.revokeObjectURL(found.url)
        }
        return prev.filter((file) => file.id !== id)
      }),
    [],
  )

  // Wrapper that validates files before calling provider's add
  const addWithProviderValidation = useCallback(
    (fileList: File[] | FileList) => {
      const sized = validateFiles(fileList)
      if (!sized) {
        return
      }

      const currentCount = files.length
      const capacity = typeof maxFiles === 'number' ? Math.max(0, maxFiles - currentCount) : undefined
      const capped = typeof capacity === 'number' ? sized.slice(0, capacity) : sized
      if (typeof capacity === 'number' && sized.length > capacity) {
        onError?.({
          code: 'max_files',
          message: 'Too many files. Some were not added.',
        })
      }

      if (capped.length > 0) {
        controller?.attachments.add(capped)
      }
    },
    [validateFiles, maxFiles, onError, files.length, controller],
  )

  const clearAttachments = useCallback(
    () =>
      usingProvider
        ? controller?.attachments.clear()
        : setItems((prev) => {
            for (const file of prev) {
              if (file.url) {
                URL.revokeObjectURL(file.url)
              }
            }
            return []
          }),
    [usingProvider, controller],
  )

  const clearReferencedSources = useCallback(() => setReferencedSources([]), [])

  const add = usingProvider ? addWithProviderValidation : addLocal
  const remove = usingProvider ? controller.attachments.remove : removeLocal
  const openFileDialog = usingProvider ? controller.attachments.openFileDialog : openFileDialogLocal

  const clear = useCallback(() => {
    clearAttachments()
    clearReferencedSources()
  }, [clearAttachments, clearReferencedSources])

  // Let provider know about our hidden file input so external menus can call openFileDialog()
  useEffect(() => {
    if (!usingProvider) {
      return
    }
    controller.__registerFileInput(inputRef, () => inputRef.current?.click())
  }, [usingProvider, controller])

  // Attach drop handlers on nearest form and document (opt-in)
  useEffect(() => {
    const form = formRef.current
    if (!form) {
      return
    }
    if (globalDrop) {
      // when global drop is on, let the document-level handler own drops
      return
    }

    const onDragOver = (e: DragEvent) => {
      if (e.dataTransfer?.types?.includes('Files')) {
        e.preventDefault()
      }
    }
    const onDrop = (e: DragEvent) => {
      if (e.dataTransfer?.types?.includes('Files')) {
        e.preventDefault()
      }
      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        add(e.dataTransfer.files)
      }
    }
    form.addEventListener('dragover', onDragOver)
    form.addEventListener('drop', onDrop)
    return () => {
      form.removeEventListener('dragover', onDragOver)
      form.removeEventListener('drop', onDrop)
    }
  }, [add, globalDrop])

  useEffect(() => {
    if (!globalDrop) {
      return
    }

    const onDragOver = (e: DragEvent) => {
      if (e.dataTransfer?.types?.includes('Files')) {
        e.preventDefault()
      }
    }
    const onDrop = (e: DragEvent) => {
      if (e.dataTransfer?.types?.includes('Files')) {
        e.preventDefault()
      }
      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        add(e.dataTransfer.files)
      }
    }
    document.addEventListener('dragover', onDragOver)
    document.addEventListener('drop', onDrop)
    return () => {
      document.removeEventListener('dragover', onDragOver)
      document.removeEventListener('drop', onDrop)
    }
  }, [add, globalDrop])

  useEffect(
    () => () => {
      if (!usingProvider) {
        for (const f of filesRef.current) {
          if (f.url) {
            URL.revokeObjectURL(f.url)
          }
        }
      }
    },
    [usingProvider],
  )

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (event.currentTarget.files) {
        add(event.currentTarget.files)
      }
      // Reset input value to allow selecting files that were previously removed
      event.currentTarget.value = ''
    },
    [add],
  )

  const attachmentsCtx = useMemo<AttachmentsContext>(
    () => ({
      add,
      clear: clearAttachments,
      fileInputRef: inputRef,
      files,
      openFileDialog,
      remove,
    }),
    [files, add, remove, clearAttachments, openFileDialog],
  )

  const refsCtx = useMemo<ReferencedSourcesContext>(
    () => ({
      add: (incoming: SourceDocumentUIPart[] | SourceDocumentUIPart) => {
        const array = Array.isArray(incoming) ? incoming : [incoming]
        setReferencedSources((prev) => [...prev, ...array.map((s) => ({ ...s, id: createId() }))])
      },
      clear: clearReferencedSources,
      remove: (id: string) => {
        setReferencedSources((prev) => prev.filter((s) => s.id !== id))
      },
      sources: referencedSources,
    }),
    [referencedSources, clearReferencedSources],
  )

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault()

      const form = event.currentTarget
      const text = usingProvider
        ? controller.textInput.value
        : (() => {
            const formData = new FormData(form)
            return (formData.get('message') as string) || ''
          })()

      // Reset form immediately after capturing text to avoid race condition
      // where user input during async blob conversion would be lost
      if (!usingProvider) {
        form.reset()
      }

      try {
        // Convert blob URLs to data URLs asynchronously
        const convertedFiles: FileUIPart[] = await Promise.all(
          files.map(async ({ id: _id, ...item }) => {
            if (item.url?.startsWith('blob:')) {
              const dataUrl = await convertBlobUrlToDataUrl(item.url)
              // If conversion failed, keep the original blob URL
              return {
                ...item,
                url: dataUrl ?? item.url,
              }
            }
            return item
          }),
        )

        const result = onSubmit({ files: convertedFiles, text }, event)

        // Handle both sync and async onSubmit
        if (result instanceof Promise) {
          try {
            await result
            clear()
            if (usingProvider) {
              controller.textInput.clear()
            }
          } catch {
            // Don't clear on error - user may want to retry
          }
        } else {
          // Sync function completed without throwing, clear inputs
          clear()
          if (usingProvider) {
            controller.textInput.clear()
          }
        }
      } catch {
        // Don't clear on error - user may want to retry
      }
    },
    [usingProvider, controller, files, onSubmit, clear],
  )

  return (
    <LocalAttachmentsContext.Provider value={attachmentsCtx}>
      <LocalReferencedSourcesContext.Provider value={refsCtx}>
        <input
          accept={accept}
          aria-label="Upload files"
          hidden
          multiple={multiple}
          onChange={handleChange}
          ref={inputRef}
          type="file"
        />
        <form data-scope="prompt-input" data-part="root" ref={formRef} {...props} onSubmit={handleSubmit}>
          {children}
        </form>
      </LocalReferencedSourcesContext.Provider>
    </LocalAttachmentsContext.Provider>
  )
}

export type PromptInputBodyProps = HTMLAttributes<HTMLDivElement>

export function PromptInputBody(props: PromptInputBodyProps) {
  return <div data-scope="prompt-input" data-part="body" {...props} />
}

export type PromptInputTextareaProps = ComponentProps<'textarea'>

export function PromptInputTextarea({
  onChange,
  onKeyDown,
  placeholder = 'What would you like to know?',
  ...props
}: PromptInputTextareaProps) {
  const controller = useOptionalPromptInputController()
  const attachments = usePromptInputAttachments()
  const [isComposing, setIsComposing] = useState(false)

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => {
      // Call the external onKeyDown handler first
      onKeyDown?.(e)

      // If the external handler prevented default, don't run internal logic
      if (e.defaultPrevented) {
        return
      }

      if (e.key === 'Enter') {
        if (isComposing || e.nativeEvent.isComposing) {
          return
        }
        if (e.shiftKey) {
          return
        }
        e.preventDefault()

        // Check if the submit button is disabled before submitting
        const { form } = e.currentTarget
        const submitButton = form?.querySelector('button[type="submit"]') as HTMLButtonElement | null
        if (submitButton?.disabled) {
          return
        }

        form?.requestSubmit()
      }

      // Remove last attachment when Backspace is pressed and textarea is empty
      if (e.key === 'Backspace' && e.currentTarget.value === '' && attachments.files.length > 0) {
        e.preventDefault()
        const lastAttachment = attachments.files.at(-1)
        if (lastAttachment) {
          attachments.remove(lastAttachment.id)
        }
      }
    },
    [onKeyDown, isComposing, attachments],
  )

  const handlePaste: ClipboardEventHandler<HTMLTextAreaElement> = useCallback(
    (event) => {
      const items = event.clipboardData?.items

      if (!items) {
        return
      }

      const files: File[] = []

      for (const item of items) {
        if (item.kind === 'file') {
          const file = item.getAsFile()
          if (file) {
            files.push(file)
          }
        }
      }

      if (files.length > 0) {
        event.preventDefault()
        attachments.add(files)
      }
    },
    [attachments],
  )

  const handleCompositionEnd = useCallback(() => setIsComposing(false), [])
  const handleCompositionStart = useCallback(() => setIsComposing(true), [])

  const controlledProps = controller
    ? {
        onChange: (e: ChangeEvent<HTMLTextAreaElement>) => {
          controller.textInput.setInput(e.currentTarget.value)
          onChange?.(e)
        },
        value: controller.textInput.value,
      }
    : {
        onChange,
      }

  return (
    <textarea
      data-scope="prompt-input"
      data-part="textarea"
      name="message"
      onCompositionEnd={handleCompositionEnd}
      onCompositionStart={handleCompositionStart}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      placeholder={placeholder}
      {...props}
      {...controlledProps}
    />
  )
}

export type PromptInputHeaderProps = HTMLAttributes<HTMLDivElement>

export function PromptInputHeader(props: PromptInputHeaderProps) {
  return <div data-scope="prompt-input" data-part="header" {...props} />
}

export type PromptInputFooterProps = HTMLAttributes<HTMLDivElement>

export function PromptInputFooter(props: PromptInputFooterProps) {
  return <div data-scope="prompt-input" data-part="footer" {...props} />
}

export type PromptInputToolsProps = HTMLAttributes<HTMLDivElement>

export function PromptInputTools(props: PromptInputToolsProps) {
  return <div data-scope="prompt-input" data-part="tools" {...props} />
}

export type PromptInputButtonProps = ComponentProps<'button'> & {
  tooltip?: string
}

export function PromptInputButton({ tooltip, children, ...props }: PromptInputButtonProps) {
  const button = (
    <button type="button" data-scope="prompt-input" data-part="button" {...props}>
      {children}
    </button>
  )

  if (!tooltip) {
    return button
  }

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>{button}</Tooltip.Trigger>
      <Tooltip.Positioner>
        <Tooltip.Content data-scope="prompt-input" data-part="button-tooltip">
          {tooltip}
        </Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  )
}

export type PromptInputActionMenuProps = ComponentProps<typeof Menu.Root>

export function PromptInputActionMenu(props: PromptInputActionMenuProps) {
  return <Menu.Root {...props} />
}

export type PromptInputActionMenuTriggerProps = PromptInputButtonProps

export function PromptInputActionMenuTrigger({ children, ...props }: PromptInputActionMenuTriggerProps) {
  return (
    <Menu.Trigger asChild>
      <PromptInputButton {...props}>{children}</PromptInputButton>
    </Menu.Trigger>
  )
}

export type PromptInputActionMenuContentProps = ComponentProps<typeof Menu.Content>

export function PromptInputActionMenuContent(props: PromptInputActionMenuContentProps) {
  return (
    <Menu.Positioner>
      <Menu.Content data-scope="prompt-input" data-part="action-menu-content" {...props} />
    </Menu.Positioner>
  )
}

export type PromptInputActionMenuItemProps = ComponentProps<typeof Menu.Item>

export function PromptInputActionMenuItem(props: PromptInputActionMenuItemProps) {
  return <Menu.Item data-scope="prompt-input" data-part="action-menu-item" {...props} />
}

export type PromptInputSubmitProps = Omit<ComponentProps<'button'>, 'type'> & {
  status?: ChatStatus
  onStop?: () => void
}

export function PromptInputSubmit({ status, onStop, onClick, children, ...props }: PromptInputSubmitProps) {
  const isGenerating = status === 'submitted' || status === 'streaming'

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isGenerating && onStop) {
      e.preventDefault()
      onStop()
      return
    }
    onClick?.(e)
  }

  return (
    <button
      type={isGenerating && onStop ? 'button' : 'submit'}
      aria-label={isGenerating ? 'Stop' : 'Submit'}
      data-scope="prompt-input"
      data-part="submit"
      data-status={status}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  )
}
