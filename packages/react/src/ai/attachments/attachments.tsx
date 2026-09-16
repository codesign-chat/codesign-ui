import type { FileUIPart, SourceDocumentUIPart } from 'ai'
import type { ComponentProps, HTMLAttributes, MouseEvent as ReactMouseEvent, ReactNode } from 'react'
import { createContext, useCallback, useContext, useMemo } from 'react'

// ============================================================================
// Types
// ============================================================================

export type AttachmentData = (FileUIPart & { id: string }) | (SourceDocumentUIPart & { id: string })

export type AttachmentMediaCategory = 'image' | 'video' | 'audio' | 'document' | 'source' | 'unknown'

export type AttachmentVariant = 'grid' | 'inline' | 'list'

// ============================================================================
// Utility Functions
// ============================================================================

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

// ============================================================================
// Contexts
// ============================================================================

interface AttachmentsContextValue {
  variant: AttachmentVariant
}

const AttachmentsContext = createContext<AttachmentsContextValue | null>(null)

interface AttachmentContextValue {
  data: AttachmentData
  mediaCategory: AttachmentMediaCategory
  onRemove?: () => void
  variant: AttachmentVariant
}

const AttachmentContext = createContext<AttachmentContextValue | null>(null)

// ============================================================================
// Hooks
// ============================================================================

export function useAttachmentsContext() {
  return useContext(AttachmentsContext) ?? { variant: 'grid' as const }
}

export function useAttachmentContext() {
  const ctx = useContext(AttachmentContext)
  if (!ctx) {
    throw new Error('Attachment components must be used within <Attachment>')
  }
  return ctx
}

// ============================================================================
// Attachments - Container
// ============================================================================

export type AttachmentsProps = HTMLAttributes<HTMLDivElement> & {
  variant?: AttachmentVariant
}

export function Attachments({ variant = 'grid', children, ...props }: AttachmentsProps) {
  const contextValue = useMemo(() => ({ variant }), [variant])

  return (
    <AttachmentsContext.Provider value={contextValue}>
      <div data-scope="attachment" data-part="root" data-variant={variant} {...props}>
        {children}
      </div>
    </AttachmentsContext.Provider>
  )
}

// ============================================================================
// Attachment - Item
// ============================================================================

export type AttachmentProps = HTMLAttributes<HTMLDivElement> & {
  data: AttachmentData
  onRemove?: () => void
}

export function Attachment({ data, onRemove, children, ...props }: AttachmentProps) {
  const { variant } = useAttachmentsContext()
  const mediaCategory = getMediaCategory(data)

  const contextValue = useMemo<AttachmentContextValue>(
    () => ({ data, mediaCategory, onRemove, variant }),
    [data, mediaCategory, onRemove, variant],
  )

  return (
    <AttachmentContext.Provider value={contextValue}>
      <div data-scope="attachment" data-part="item" data-category={mediaCategory} data-variant={variant} {...props}>
        {children}
      </div>
    </AttachmentContext.Provider>
  )
}

// ============================================================================
// AttachmentPreview - Media preview
// ============================================================================

export type AttachmentPreviewProps = HTMLAttributes<HTMLDivElement> & {
  fallbackIcon?: ReactNode
}

export function AttachmentPreview({ fallbackIcon, ...props }: AttachmentPreviewProps) {
  const { data, mediaCategory } = useAttachmentContext()

  const renderContent = () => {
    if (mediaCategory === 'image' && data.type === 'file' && data.url) {
      return <img alt={data.filename || 'Image'} src={data.url} />
    }

    if (mediaCategory === 'video' && data.type === 'file' && data.url) {
      return <video muted src={data.url} />
    }

    return fallbackIcon ?? null
  }

  return (
    <div data-scope="attachment" data-part="preview" {...props}>
      {renderContent()}
    </div>
  )
}

// ============================================================================
// AttachmentInfo - Name and type display
// ============================================================================

export type AttachmentInfoProps = HTMLAttributes<HTMLDivElement> & {
  showMediaType?: boolean
}

export function AttachmentInfo({ showMediaType = false, ...props }: AttachmentInfoProps) {
  const { data, variant } = useAttachmentContext()
  const label = getAttachmentLabel(data)

  if (variant === 'grid') {
    return null
  }

  return (
    <div data-scope="attachment" data-part="info" {...props}>
      <span>{label}</span>
      {showMediaType && data.mediaType && <span>{data.mediaType}</span>}
    </div>
  )
}

// ============================================================================
// AttachmentRemove - Remove button
// ============================================================================

export type AttachmentRemoveProps = ComponentProps<'button'> & {
  label?: string
}

export function AttachmentRemove({ label = 'Remove', children, onClick, ...props }: AttachmentRemoveProps) {
  const { onRemove } = useAttachmentContext()

  const handleClick = useCallback(
    (e: ReactMouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      onRemove?.()
      onClick?.(e)
    },
    [onRemove, onClick],
  )

  if (!onRemove) {
    return null
  }

  return (
    <button
      type="button"
      aria-label={label}
      data-scope="attachment"
      data-part="remove"
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  )
}

// ============================================================================
// AttachmentEmpty - Empty state
// ============================================================================

export type AttachmentEmptyProps = HTMLAttributes<HTMLDivElement>

export function AttachmentEmpty({ children, ...props }: AttachmentEmptyProps) {
  return (
    <div data-scope="attachment" data-part="empty" {...props}>
      {children ?? 'No attachments'}
    </div>
  )
}
