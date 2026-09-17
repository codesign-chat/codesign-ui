import { defineComponent, h, inject, onBeforeUnmount, provide, ref, type InjectionKey, type PropType } from 'vue'
import { TooltipContent, TooltipPositioner, TooltipRoot, TooltipTrigger } from '../../components/tooltip/index.ts'

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
  remove: (id: string) => void
}

const attachmentsKey: InjectionKey<AttachmentsContextValue> = Symbol('prompt-input-attachments')

export function usePromptInputAttachments(): AttachmentsContextValue {
  const context = inject(attachmentsKey)
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

export const PromptInput = defineComponent({
  name: 'PromptInput',
  props: {
    accept: { type: String, default: undefined },
    globalDrop: { type: Boolean, default: false },
    maxFileSize: { type: Number, default: undefined },
    maxFiles: { type: Number, default: undefined },
    multiple: { type: Boolean, default: undefined },
    onError: {
      type: Function as PropType<(err: { code: 'accept' | 'max_file_size' | 'max_files'; message: string }) => void>,
      default: undefined,
    },
    onSubmit: {
      type: Function as PropType<(message: PromptInputMessage) => void | Promise<void>>,
      required: true,
    },
  },
  setup(props, { attrs, slots }) {
    const inputRef = ref<HTMLInputElement | null>(null)
    const files = ref<AttachmentItem[]>([])

    const matchesAccept = (file: File) => {
      if (!props.accept || props.accept.trim() === '') return true
      const patterns = props.accept
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
        props.onError?.({ code: 'accept', message: 'No files match the accepted types.' })
        return null
      }
      const sized = accepted.filter((file) => (props.maxFileSize ? file.size <= props.maxFileSize : true))
      if (accepted.length > 0 && sized.length === 0) {
        props.onError?.({ code: 'max_file_size', message: 'All files exceed the maximum size.' })
        return null
      }
      return sized
    }

    const add = (fileList: File[] | FileList) => {
      const sized = validateFiles(fileList)
      if (!sized) return
      files.value = [
        ...files.value,
        ...sized.map((file) => ({
          filename: file.name,
          id: createId(),
          mediaType: file.type,
          type: 'file' as const,
          url: URL.createObjectURL(file),
        })),
      ]
      if (props.maxFiles !== undefined && files.value.length > props.maxFiles) {
        files.value = files.value.slice(0, props.maxFiles)
        props.onError?.({ code: 'max_files', message: 'Too many files. Some were not added.' })
      }
    }

    const remove = (id: string) => {
      const found = files.value.find((file) => file.id === id)
      if (found) URL.revokeObjectURL(found.url)
      files.value = files.value.filter((file) => file.id !== id)
    }

    const clear = () => {
      for (const file of files.value) URL.revokeObjectURL(file.url)
      files.value = []
    }

    const openFileDialog = () => inputRef.value?.click()

    onBeforeUnmount(() => {
      for (const file of files.value) URL.revokeObjectURL(file.url)
    })

    provide(attachmentsKey, {
      add,
      clear,
      get files() {
        return files.value
      },
      openFileDialog,
      remove,
    })

    const handleSubmit = async (event: SubmitEvent) => {
      event.preventDefault()
      const form = event.currentTarget as HTMLFormElement
      const text = new FormData(form).get('message')?.toString() ?? ''
      form.reset()
      try {
        const converted = await Promise.all(
          files.value.map(async ({ id: _id, ...item }) => {
            if (item.url.startsWith('blob:')) {
              return { ...item, url: (await convertBlobUrlToDataUrl(item.url)) ?? item.url }
            }
            return item
          }),
        )
        const result = props.onSubmit({ files: converted, text })
        if (result instanceof Promise) {
          try {
            await result
            clear()
          } catch {
            // keep state for retry
          }
        } else {
          clear()
        }
      } catch {
        // keep state for retry
      }
    }

    return () => [
      h('input', {
        accept: props.accept,
        'aria-label': 'Upload files',
        hidden: true,
        multiple: props.multiple,
        onChange: (event: Event) => {
          const target = event.target as HTMLInputElement
          if (target.files) add(target.files)
          target.value = ''
        },
        ref: inputRef,
        type: 'file',
      }),
      h(
        'form',
        {
          ...attrs,
          'data-scope': SCOPE,
          'data-part': 'root',
          onDragover: (event: DragEvent) => {
            if (event.dataTransfer?.types?.includes('Files')) event.preventDefault()
          },
          onDrop: (event: DragEvent) => {
            if (event.dataTransfer?.types?.includes('Files')) event.preventDefault()
            if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) add(event.dataTransfer.files)
          },
          onSubmit: handleSubmit,
        },
        slots.default?.(),
      ),
    ]
  },
})

export const PromptInputBody = defineComponent({
  name: 'PromptInputBody',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'body' }, slots.default?.())
  },
})

export const PromptInputTextarea = defineComponent({
  name: 'PromptInputTextarea',
  props: { placeholder: { type: String, default: 'What would you like to know?' } },
  setup(props, { attrs }) {
    const attachments = usePromptInputAttachments()
    let isComposing = false

    return () =>
      h('textarea', {
        ...attrs,
        'data-scope': SCOPE,
        'data-part': 'textarea',
        name: 'message',
        onCompositionend: () => (isComposing = false),
        onCompositionstart: () => (isComposing = true),
        onKeydown: (event: KeyboardEvent) => {
          if (event.defaultPrevented) return
          const target = event.currentTarget as HTMLTextAreaElement
          if (event.key === 'Enter') {
            if (isComposing || event.isComposing || event.shiftKey) return
            event.preventDefault()
            const submitButton = target.form?.querySelector<HTMLButtonElement>('button[type="submit"]')
            if (submitButton?.disabled) return
            target.form?.requestSubmit()
          }
          if (event.key === 'Backspace' && target.value === '' && attachments.files.length > 0) {
            event.preventDefault()
            const last = attachments.files.at(-1)
            if (last) attachments.remove(last.id)
          }
        },
        onPaste: (event: ClipboardEvent) => {
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
        },
        placeholder: props.placeholder,
      })
  },
})

export const PromptInputHeader = defineComponent({
  name: 'PromptInputHeader',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'header' }, slots.default?.())
  },
})

export const PromptInputFooter = defineComponent({
  name: 'PromptInputFooter',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'footer' }, slots.default?.())
  },
})

export const PromptInputTools = defineComponent({
  name: 'PromptInputTools',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'tools' }, slots.default?.())
  },
})

export const PromptInputButton = defineComponent({
  name: 'PromptInputButton',
  props: { tooltip: { type: String, default: undefined } },
  setup(props, { attrs, slots }) {
    return () => {
      const button = h(
        'button',
        { ...attrs, type: 'button', 'data-scope': SCOPE, 'data-part': 'button' },
        slots.default?.(),
      )
      if (!props.tooltip) return button
      return h(TooltipRoot, null, () => [
        h(TooltipTrigger, { 'as-child': '' }, () => button),
        h(TooltipPositioner, null, () =>
          h(TooltipContent, { 'data-scope': SCOPE, 'data-part': 'button-tooltip' }, props.tooltip),
        ),
      ])
    }
  },
})

export const PromptInputSubmit = defineComponent({
  name: 'PromptInputSubmit',
  props: {
    onStop: { type: Function, default: undefined },
    status: { type: String as () => 'ready' | 'streaming' | 'submitted', default: undefined },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const isGenerating = props.status === 'submitted' || props.status === 'streaming'
      return h(
        'button',
        {
          ...attrs,
          'aria-label': isGenerating ? 'Stop' : 'Submit',
          'data-scope': SCOPE,
          'data-part': 'submit',
          'data-status': props.status,
          onClick: (event: MouseEvent) => {
            if (isGenerating && props.onStop) {
              event.preventDefault()
              props.onStop()
            }
          },
          type: isGenerating && props.onStop ? 'button' : 'submit',
        },
        slots.default?.(),
      )
    }
  },
})
