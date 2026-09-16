import { describe, expect, it } from 'vitest'
import { getAttachmentLabel, getMediaCategory, type AttachmentData } from './attachments.tsx'

const file = (overrides: Partial<Extract<AttachmentData, { type: 'file' }>> = {}): AttachmentData => ({
  id: '1',
  type: 'file',
  mediaType: '',
  url: '',
  ...overrides,
})

const source = (overrides: Partial<Extract<AttachmentData, { type: 'source-document' }>> = {}): AttachmentData => ({
  id: '1',
  type: 'source-document',
  sourceId: 's1',
  mediaType: 'application/pdf',
  title: '',
  ...overrides,
})

describe('getMediaCategory', () => {
  it('maps source documents', () => {
    expect(getMediaCategory(source())).toBe('source')
  })

  it('maps media types by prefix', () => {
    expect(getMediaCategory(file({ mediaType: 'image/png' }))).toBe('image')
    expect(getMediaCategory(file({ mediaType: 'video/mp4' }))).toBe('video')
    expect(getMediaCategory(file({ mediaType: 'audio/mpeg' }))).toBe('audio')
    expect(getMediaCategory(file({ mediaType: 'application/pdf' }))).toBe('document')
    expect(getMediaCategory(file({ mediaType: 'text/plain' }))).toBe('document')
  })

  it('falls back to unknown', () => {
    expect(getMediaCategory(file({ mediaType: 'model/gltf-binary' }))).toBe('unknown')
    expect(getMediaCategory(file())).toBe('unknown')
  })
})

describe('getAttachmentLabel', () => {
  it('prefers title for source documents', () => {
    expect(getAttachmentLabel(source({ title: 'Spec' }))).toBe('Spec')
    expect(getAttachmentLabel(source({ title: '', filename: 'a.pdf' }))).toBe('a.pdf')
    expect(getAttachmentLabel(source())).toBe('Source')
  })

  it('prefers filename for files', () => {
    expect(getAttachmentLabel(file({ filename: 'cat.png', mediaType: 'image/png' }))).toBe('cat.png')
  })

  it('falls back to a category-based label', () => {
    expect(getAttachmentLabel(file({ mediaType: 'image/png' }))).toBe('Image')
    expect(getAttachmentLabel(file({ mediaType: 'application/pdf' }))).toBe('Attachment')
  })
})
