import { defineComponent, h, inject, provide, type InjectionKey, type PropType, type VNode } from 'vue'

const SCOPE = 'attachment'

export interface AttachmentFilePart {
  filename?: string
  mediaType?: string
  type: 'file'
  url?: string
}

export interface AttachmentSourceDocumentPart {
  filename?: string
  title?: string
  type: 'source-document'
}

export type AttachmentData = (AttachmentFilePart & { id: string }) | (AttachmentSourceDocumentPart & { id: string })

export type AttachmentMediaCategory = 'image' | 'video' | 'audio' | 'document' | 'source' | 'unknown'

export type AttachmentVariant = 'grid' | 'inline' | 'list'

export function getMediaCategory(data: AttachmentData): AttachmentMediaCategory {
  if (data.type === 'source-document') {
    return 'source'
  }
  const mediaType = data.mediaType ?? ''
  if (mediaType.startsWith('image/')) return 'image'
  if (mediaType.startsWith('video/')) return 'video'
  if (mediaType.startsWith('audio/')) return 'audio'
  if (mediaType.startsWith('application/') || mediaType.startsWith('text/')) return 'document'
  return 'unknown'
}

export function getAttachmentLabel(data: AttachmentData): string {
  if (data.type === 'source-document') {
    return data.title || data.filename || 'Source'
  }
  const category = getMediaCategory(data)
  return data.filename || (category === 'image' ? 'Image' : 'Attachment')
}

interface AttachmentsContextValue {
  variant: AttachmentVariant
}

interface AttachmentContextValue {
  data: AttachmentData
  mediaCategory: AttachmentMediaCategory
  onRemove?: () => void
  variant: AttachmentVariant
}

const attachmentsKey: InjectionKey<AttachmentsContextValue> = Symbol('attachments')
const attachmentKey: InjectionKey<AttachmentContextValue> = Symbol('attachment')

export function useAttachmentsContext(): AttachmentsContextValue {
  return inject(attachmentsKey, { variant: 'grid' })
}

export function useAttachmentContext(): AttachmentContextValue {
  const context = inject(attachmentKey)
  if (!context) {
    throw new Error('Attachment components must be used within Attachment')
  }
  return context
}

export const Attachments = defineComponent({
  name: 'Attachments',
  props: { variant: { type: String as PropType<AttachmentVariant>, default: 'grid' } },
  setup(props, { attrs, slots }) {
    provide(attachmentsKey, { variant: props.variant })
    return () =>
      h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'root', 'data-variant': props.variant }, slots.default?.())
  },
})

export const Attachment = defineComponent({
  name: 'Attachment',
  props: {
    data: { type: Object as PropType<AttachmentData>, required: true },
    onRemove: { type: Function as PropType<() => void>, default: undefined },
  },
  setup(props, { attrs, slots }) {
    const { variant } = useAttachmentsContext()
    const mediaCategory = getMediaCategory(props.data)
    provide(attachmentKey, { data: props.data, mediaCategory, onRemove: props.onRemove, variant })
    return () =>
      h(
        'div',
        { ...attrs, 'data-category': mediaCategory, 'data-scope': SCOPE, 'data-part': 'item', 'data-variant': variant },
        slots.default?.(),
      )
  },
})

export const AttachmentPreview = defineComponent({
  name: 'AttachmentPreview',
  props: { fallbackIcon: { type: Object as PropType<VNode>, default: undefined } },
  setup(props, { attrs }) {
    return () => {
      const { data, mediaCategory } = useAttachmentContext()
      let content: VNode | VNode[] | null = props.fallbackIcon ?? null
      if (mediaCategory === 'image' && data.type === 'file' && data.url) {
        content = h('img' as any, { alt: data.filename || 'Image', src: data.url })
      } else if (mediaCategory === 'video' && data.type === 'file' && data.url) {
        content = h('video' as any, { muted: true, src: data.url })
      }
      return h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'preview' }, content as any)
    }
  },
})

export const AttachmentInfo = defineComponent({
  name: 'AttachmentInfo',
  props: { showMediaType: { type: Boolean, default: false } },
  setup(props, { attrs }) {
    return () => {
      const { data, variant } = useAttachmentContext()
      if (variant === 'grid') return null
      const label = getAttachmentLabel(data)
      return h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'info' }, [
        h('span', label),
        props.showMediaType && 'mediaType' in data && data.mediaType ? h('span', data.mediaType) : null,
      ])
    }
  },
})

export const AttachmentRemove = defineComponent({
  name: 'AttachmentRemove',
  props: { label: { type: String, default: 'Remove' } },
  setup(props, { attrs, slots }) {
    return () => {
      const { onRemove } = useAttachmentContext()
      if (!onRemove) return null
      return h(
        'button',
        {
          ...attrs,
          'aria-label': props.label,
          'data-scope': SCOPE,
          'data-part': 'remove',
          onClick: (event: Event) => {
            event.stopPropagation()
            onRemove?.()
          },
          type: 'button',
        },
        slots.default?.(),
      )
    }
  },
})

export const AttachmentEmpty = defineComponent({
  name: 'AttachmentEmpty',
  setup(_, { attrs, slots }) {
    return () =>
      h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'empty' }, slots.default?.() ?? 'No attachments')
  },
})
