import { getContext } from 'svelte'

export interface AttachmentItem {
  filename: string
  id: string
  mediaType: string
  type: 'file'
  url: string
}

export interface PromptInputAttachmentsContextValue {
  add: (files: File[] | FileList) => void
  clear: () => void
  files: AttachmentItem[]
  openFileDialog: () => void
  remove: (id: string) => void
}

export const promptInputAttachmentsKey: symbol = Symbol('prompt-input-attachments')

export function usePromptInputAttachments(): PromptInputAttachmentsContextValue {
  const context = getContext<PromptInputAttachmentsContextValue>(promptInputAttachmentsKey)
  if (!context) {
    throw new Error('usePromptInputAttachments must be used within a PromptInput')
  }
  return context
}
