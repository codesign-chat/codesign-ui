import {
  ArrowDownIcon,
  CopyIcon,
  PaperclipIcon,
  PlusIcon,
  RefreshCwIcon,
  SendIcon,
  SquareIcon,
  XIcon,
} from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Attachment,
  AttachmentInfo,
  AttachmentPreview,
  AttachmentRemove,
  Attachments,
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollToBottom,
  Message,
  MessageAction,
  MessageActions,
  MessageContent,
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputButton,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
  Suggestions,
  Suggestion,
  usePromptInputAttachments,
  usePromptInputController,
} from '../../index.ts'
import type { PromptInputMessage } from '../../index.ts'
import { PromptInputProvider } from '../../index.ts'
import menu from 'styles/menu.module.css'
import styles from 'styles/ai.module.css'

type ChatMessage = { id: string; from: 'user' | 'assistant'; text: string }
type Status = 'ready' | 'submitted' | 'streaming'

const REPLIES = [
  'Codesign UI ships unstyled primitives — you bring the design system, the library brings behavior.',
  'Zag.js state machines keep every interaction accessible: focus management, ARIA, and keyboard support come for free.',
  'The paperclip menu attaches files. PromptInput converts them to data URLs before your onSubmit handler sees them.',
]

const SUGGESTIONS = ['What makes Codesign UI different?', 'How does styling work?', 'Show me attachments']

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

function ChatInner() {
  const controller = usePromptInputController()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [status, setStatus] = useState<Status>('ready')
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([])
  const streamRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const turn = useRef(0)

  const clearTimers = useCallback(() => {
    timeouts.current.forEach(clearTimeout)
    timeouts.current = []
    if (streamRef.current) {
      clearInterval(streamRef.current)
      streamRef.current = null
    }
  }, [])

  useEffect(() => clearTimers, [clearTimers])

  const stop = useCallback(() => {
    clearTimers()
    setStatus('ready')
  }, [clearTimers])

  const handleSubmit = useCallback((message: PromptInputMessage) => {
    const text = message.text.trim()
    if (!text) {
      return
    }

    const assistantId = crypto.randomUUID()
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), from: 'user', text },
      { id: assistantId, from: 'assistant', text: '' },
    ])
    setStatus('submitted')

    const reply = REPLIES[turn.current % REPLIES.length]
    turn.current += 1

    timeouts.current.push(
      setTimeout(() => {
        setStatus('streaming')
        let i = 0
        streamRef.current = setInterval(() => {
          i = Math.min(i + 2, reply.length)
          setMessages((prev) => prev.map((m) => (m.id === assistantId ? { ...m, text: reply.slice(0, i) } : m)))
          if (i >= reply.length) {
            if (streamRef.current) {
              clearInterval(streamRef.current)
              streamRef.current = null
            }
            setStatus('ready')
          }
        }, 40)
      }, 500),
    )
  }, [])

  return (
    <div className={styles.Chat}>
      <Conversation>
        <ConversationContent>
          {messages.length === 0 ? (
            <ConversationEmptyState
              description="Send a message to start the conversation."
              icon={<PaperclipIcon size={28} />}
              title="No messages yet"
            />
          ) : (
            messages.map((message) => (
              <Message from={message.from} key={message.id}>
                <MessageContent>{message.text}</MessageContent>
                {message.from === 'assistant' && message.text !== '' && (
                  <MessageActions>
                    <MessageAction label="Copy" tooltip="Copy">
                      <CopyIcon size={14} />
                    </MessageAction>
                    <MessageAction label="Regenerate" tooltip="Regenerate">
                      <RefreshCwIcon size={14} />
                    </MessageAction>
                  </MessageActions>
                )}
              </Message>
            ))
          )}
        </ConversationContent>
        <ConversationScrollToBottom aria-label="Scroll to bottom">
          <ArrowDownIcon size={16} />
        </ConversationScrollToBottom>
      </Conversation>
      <Suggestions>
        {SUGGESTIONS.map((suggestion) => (
          <Suggestion
            key={suggestion}
            onClick={(value) => controller.textInput.setInput(value)}
            suggestion={suggestion}
          />
        ))}
      </Suggestions>
      <PromptInput onSubmit={handleSubmit}>
        <AttachedFiles />
        <PromptInputTextarea placeholder="Ask anything…" />
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
            <PromptInputButton aria-label="Attach from picker">
              <PaperclipIcon size={16} />
            </PromptInputButton>
          </PromptInputTools>
          <PromptInputSubmit status={status} onStop={stop}>
            {status === 'streaming' || status === 'submitted' ? <SquareIcon size={14} /> : <SendIcon size={14} />}
          </PromptInputSubmit>
        </PromptInputFooter>
      </PromptInput>
    </div>
  )
}

export function Chat() {
  return (
    <PromptInputProvider>
      <ChatInner />
    </PromptInputProvider>
  )
}
