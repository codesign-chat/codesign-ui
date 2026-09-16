import { useState } from 'react'
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
  usePromptInputAttachments,
} from '../prompt-input.tsx'
import {
  Attachment,
  AttachmentInfo,
  AttachmentPreview,
  AttachmentRemove,
  Attachments,
} from '../../attachments/index.ts'
import { PlusIcon, SendIcon, XIcon } from 'lucide-react'
import menu from 'styles/menu.module.css'
import styles from 'styles/ai.module.css'

function AttachedFiles() {
  const { files, remove } = usePromptInputAttachments()
  if (files.length === 0) {
    return null
  }
  return (
    <Attachments variant="inline">
      {files.map((file) => (
        <Attachment data={file} key={file.id} onRemove={() => remove(file.id)}>
          <AttachmentPreview />
          <AttachmentInfo />
          <AttachmentRemove>
            <XIcon size={12} />
          </AttachmentRemove>
        </Attachment>
      ))}
    </Attachments>
  )
}

export function Basic() {
  const [last, setLast] = useState('Submit a message to see the payload.')

  return (
    <div style={{ display: 'grid', gap: 16, maxWidth: 480 }}>
      <PromptInput
        onSubmit={(message) => setLast(JSON.stringify({ text: message.text, files: message.files.length }, null, 2))}
      >
        <AttachedFiles />
        <PromptInputTextarea placeholder="What would you like to know?" />
        <PromptInputFooter>
          <PromptInputTools>
            <PromptInputActionMenu>
              <PromptInputActionMenuTrigger aria-label="Add content">
                <PlusIcon size={16} />
              </PromptInputActionMenuTrigger>
              <PromptInputActionMenuContent className={menu.Content}>
                <PromptInputActionAddAttachments className={menu.Item} />
              </PromptInputActionMenuContent>
            </PromptInputActionMenu>
          </PromptInputTools>
          <PromptInputSubmit>
            <SendIcon size={14} />
          </PromptInputSubmit>
        </PromptInputFooter>
      </PromptInput>
      <pre className={styles.Payload}>{last}</pre>
    </div>
  )
}
