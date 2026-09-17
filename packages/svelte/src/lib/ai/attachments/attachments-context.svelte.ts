import { getContext } from 'svelte'

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

export interface AttachmentsContextValue {
  variant: AttachmentVariant
}

export interface AttachmentContextValue {
  data: AttachmentData
  mediaCategory: AttachmentMediaCategory
  onRemove?: () => void
  variant: AttachmentVariant
}

export const attachmentsKey: symbol = Symbol('attachments')
export const attachmentKey: symbol = Symbol('attachment')

export function useAttachmentsContext(): AttachmentsContextValue {
  return getContext<AttachmentsContextValue>(attachmentsKey) ?? { variant: 'grid' }
}

export function useAttachmentContext(): AttachmentContextValue {
  const context = getContext<AttachmentContextValue>(attachmentKey)
  if (!context) {
    throw new Error('Attachment components must be used within Attachment')
  }
  return context
}

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
