import 'styles/ai.module.css'
import { FileTextIcon, GlobeIcon, XIcon } from 'lucide-react'
import { Attachment } from '../attachments.tsx'
import { AttachmentEmpty } from '../attachments.tsx'
import { AttachmentInfo } from '../attachments.tsx'
import { AttachmentPreview } from '../attachments.tsx'
import { AttachmentRemove } from '../attachments.tsx'
import { Attachments } from '../attachments.tsx'
import type { AttachmentData } from '../attachments.tsx'

const SAMPLE_IMAGE =
  'data:image/svg+xml;charset=utf-8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><rect width="96" height="96" rx="12" fill="#6366f1"/><circle cx="48" cy="40" r="14" fill="#fff"/><path d="M20 86c4-16 14-24 28-24s24 8 28 24" fill="#fff"/></svg>',
  )

const IMAGE: AttachmentData = {
  id: '1',
  type: 'file',
  mediaType: 'image/svg+xml',
  filename: 'moodboard.svg',
  url: SAMPLE_IMAGE,
}

const DOCUMENT: AttachmentData = {
  id: '2',
  type: 'file',
  mediaType: 'application/pdf',
  filename: 'invoice-q3.pdf',
  url: '',
}

const SOURCE: AttachmentData = {
  id: '3',
  type: 'source-document',
  sourceId: 'doc-1',
  mediaType: 'text/html',
  title: 'Codesign UI docs',
}

export function Grid() {
  return (
    <Attachments variant="grid">
      <Attachment data={IMAGE} onRemove={() => {}}>
        <AttachmentPreview />
        <AttachmentRemove>
          <XIcon size={12} />
        </AttachmentRemove>
      </Attachment>
      <Attachment data={DOCUMENT} onRemove={() => {}}>
        <AttachmentPreview fallbackIcon={<FileTextIcon size={20} />} />
        <AttachmentRemove>
          <XIcon size={12} />
        </AttachmentRemove>
      </Attachment>
    </Attachments>
  )
}

export function Inline() {
  return (
    <Attachments variant="inline">
      <Attachment data={IMAGE}>
        <AttachmentPreview />
        <AttachmentInfo />
      </Attachment>
      <Attachment data={DOCUMENT}>
        <AttachmentPreview fallbackIcon={<FileTextIcon size={12} />} />
        <AttachmentInfo />
      </Attachment>
    </Attachments>
  )
}

export function List() {
  return (
    <div style={{ maxWidth: 420 }}>
      <Attachments variant="list">
        <Attachment data={IMAGE} onRemove={() => {}}>
          <AttachmentPreview />
          <AttachmentInfo showMediaType />
          <AttachmentRemove>
            <XIcon size={14} />
          </AttachmentRemove>
        </Attachment>
        <Attachment data={SOURCE}>
          <AttachmentPreview fallbackIcon={<GlobeIcon size={18} />} />
          <AttachmentInfo showMediaType />
        </Attachment>
      </Attachments>
    </div>
  )
}

export function Empty() {
  return (
    <Attachments variant="list">
      <AttachmentEmpty />
    </Attachments>
  )
}
