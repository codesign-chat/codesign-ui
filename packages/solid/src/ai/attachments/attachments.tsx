import { createContext, splitProps, useContext } from 'solid-js'
import type { JSX } from 'solid-js'

const SCOPE = 'attachment'

// Structural equivalents of the AI SDK UI-part types (no runtime dependency on `ai`)
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

  if (mediaType.startsWith('image/')) {
    return 'image'
  }
  if (mediaType.startsWith('video/')) {
    return 'video'
  }
  if (mediaType.startsWith('audio/')) {
    return 'audio'
  }
  if (mediaType.startsWith('application/') || mediaType.startsWith('text/')) {
    return 'document'
  }

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

const AttachmentsContext = createContext<AttachmentsContextValue>()

export function useAttachmentsContext(): AttachmentsContextValue {
  return useContext(AttachmentsContext) ?? { variant: 'grid' }
}

interface AttachmentContextValue {
  data: AttachmentData
  mediaCategory: AttachmentMediaCategory
  onRemove?: () => void
  variant: AttachmentVariant
}

const AttachmentContext = createContext<AttachmentContextValue>()

export function useAttachmentContext(): AttachmentContextValue {
  const context = useContext(AttachmentContext)
  if (!context) {
    throw new Error('Attachment components must be used within Attachment')
  }
  return context
}

export type AttachmentsProps = JSX.HTMLAttributes<HTMLDivElement> & {
  variant?: AttachmentVariant
}

export function Attachments(props: AttachmentsProps) {
  const [local, rest] = splitProps(props, ['variant', 'children'])

  return (
    <AttachmentsContext.Provider value={{ variant: local.variant ?? 'grid' }}>
      <div data-scope={SCOPE} data-part="root" data-variant={local.variant ?? 'grid'} {...rest}>
        {local.children}
      </div>
    </AttachmentsContext.Provider>
  )
}

export type AttachmentProps = JSX.HTMLAttributes<HTMLDivElement> & {
  data: AttachmentData
  onRemove?: () => void
}

export function Attachment(props: AttachmentProps) {
  const [local, rest] = splitProps(props, ['data', 'onRemove', 'children'])
  const { variant } = useAttachmentsContext()
  const mediaCategory = () => getMediaCategory(local.data)

  return (
    <AttachmentContext.Provider
      value={{
        get data() {
          return local.data
        },
        get mediaCategory() {
          return mediaCategory()
        },
        onRemove: local.onRemove,
        variant,
      }}
    >
      <div data-category={mediaCategory()} data-scope={SCOPE} data-part="item" data-variant={variant} {...rest}>
        {local.children}
      </div>
    </AttachmentContext.Provider>
  )
}

export type AttachmentPreviewProps = JSX.HTMLAttributes<HTMLDivElement> & {
  fallbackIcon?: JSX.Element
}

export function AttachmentPreview(props: AttachmentPreviewProps) {
  const [local, rest] = splitProps(props, ['fallbackIcon'])
  const { data, mediaCategory } = useAttachmentContext()

  return (
    <div data-scope={SCOPE} data-part="preview" {...rest}>
      {mediaCategory === 'image' && data.type === 'file' && data.url ? (
        <img alt={data.filename || 'Image'} src={data.url} />
      ) : mediaCategory === 'video' && data.type === 'file' && data.url ? (
        <video muted src={data.url} />
      ) : (
        (local.fallbackIcon ?? null)
      )}
    </div>
  )
}

export type AttachmentInfoProps = JSX.HTMLAttributes<HTMLDivElement> & {
  showMediaType?: boolean
}

export function AttachmentInfo(props: AttachmentInfoProps) {
  const [local, rest] = splitProps(props, ['showMediaType'])
  const { data, variant } = useAttachmentContext()
  const label = getAttachmentLabel(data)

  if (variant === 'grid') {
    return null
  }

  return (
    <div data-scope={SCOPE} data-part="info" {...rest}>
      <span>{label}</span>
      {local.showMediaType && 'mediaType' in data && data.mediaType ? <span>{data.mediaType}</span> : null}
    </div>
  )
}

export type AttachmentRemoveProps = JSX.HTMLAttributes<HTMLButtonElement> & {
  label?: string
}

export function AttachmentRemove(props: AttachmentRemoveProps) {
  const [local, rest] = splitProps(props, ['label', 'children', 'onClick'])
  const { onRemove } = useAttachmentContext()

  if (!onRemove) {
    return null
  }

  return (
    <button
      aria-label={local.label ?? 'Remove'}
      data-scope={SCOPE}
      data-part="remove"
      onClick={(event: globalThis.MouseEvent) => {
        event.stopPropagation()
        onRemove?.()
        ;(local.onClick as ((event: globalThis.MouseEvent) => void) | undefined)?.(event)
      }}
      type="button"
      {...rest}
    >
      {local.children}
    </button>
  )
}

export type AttachmentEmptyProps = JSX.HTMLAttributes<HTMLDivElement>

export function AttachmentEmpty(props: AttachmentEmptyProps) {
  const [local, rest] = splitProps(props, ['children'])
  return (
    <div data-scope={SCOPE} data-part="empty" {...rest}>
      {local.children ?? 'No attachments'}
    </div>
  )
}
