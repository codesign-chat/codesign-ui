import { ArrowDownIcon, MessagesSquareIcon } from 'lucide-react'
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollToBottom,
} from '../conversation.tsx'
import { Message, MessageContent } from '../../message/index.ts'
import styles from 'styles/ai.module.css'

const TURNS = [
  {
    from: 'user' as const,
    text: 'What makes Codesign UI different from other headless libraries?',
  },
  {
    from: 'assistant' as const,
    text: 'Every component is driven by a Zag.js state machine, so interactions stay predictable and accessible across React, Solid, Vue, and Svelte.',
  },
  {
    from: 'user' as const,
    text: 'And styling?',
  },
  {
    from: 'assistant' as const,
    text: 'Fully unstyled. Components expose data-scope and data-part attributes — the stylesheet you are looking at targets exactly those hooks.',
  },
]

export function Basic() {
  return (
    <div className={styles.Chat}>
      <Conversation>
        <ConversationContent>
          {TURNS.map((turn, index) => (
            <Message from={turn.from} key={index}>
              <MessageContent>{turn.text}</MessageContent>
            </Message>
          ))}
        </ConversationContent>
        <ConversationScrollToBottom aria-label="Scroll to bottom">
          <ArrowDownIcon size={16} />
        </ConversationScrollToBottom>
      </Conversation>
    </div>
  )
}

export function EmptyState() {
  return (
    <div className={styles.Chat}>
      <Conversation>
        <ConversationContent>
          <ConversationEmptyState
            description="Send a message to start the conversation."
            icon={<MessagesSquareIcon size={28} />}
            title="No messages yet"
          />
        </ConversationContent>
      </Conversation>
    </div>
  )
}
