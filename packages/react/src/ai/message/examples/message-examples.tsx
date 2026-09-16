import { ChevronLeftIcon, ChevronRightIcon, CopyIcon, RefreshCwIcon } from 'lucide-react'
import { Message } from '../message.tsx'
import { MessageAction } from '../message.tsx'
import { MessageActions } from '../message.tsx'
import { MessageBranch } from '../message.tsx'
import { MessageBranchContent } from '../message.tsx'
import { MessageBranchNext } from '../message.tsx'
import { MessageBranchPage } from '../message.tsx'
import { MessageBranchPrevious } from '../message.tsx'
import { MessageBranchSelector } from '../message.tsx'
import { MessageContent } from '../message.tsx'
import styles from 'styles/ai.module.css'

export function Basic() {
  return (
    <div className={styles.Chat}>
      <Message from="user">
        <MessageContent>How do the state machines help accessibility?</MessageContent>
      </Message>
      <Message from="assistant">
        <MessageContent>
          Each machine owns focus management, ARIA attributes, and keyboard interactions, so components stay compliant
          without extra work in your app.
        </MessageContent>
      </Message>
    </div>
  )
}

export function Actions() {
  return (
    <div className={styles.Chat}>
      <Message from="assistant">
        <MessageContent>
          Hover the icons below — tooltips come from the Tooltip primitive inside MessageAction.
        </MessageContent>
        <MessageActions>
          <MessageAction label="Copy" tooltip="Copy">
            <CopyIcon size={14} />
          </MessageAction>
          <MessageAction label="Regenerate" tooltip="Regenerate">
            <RefreshCwIcon size={14} />
          </MessageAction>
        </MessageActions>
      </Message>
    </div>
  )
}

export function Branches() {
  return (
    <div className={styles.Chat}>
      <Message from="assistant">
        <MessageBranch>
          <MessageBranchContent>
            <MessageContent>First draft of the answer.</MessageContent>
            <MessageContent>Alternative draft, regenerated with a different tone.</MessageContent>
            <MessageContent>Third draft — notice the page counter updates.</MessageContent>
          </MessageBranchContent>
          <MessageBranchSelector>
            <MessageBranchPrevious>
              <ChevronLeftIcon size={14} />
            </MessageBranchPrevious>
            <MessageBranchPage />
            <MessageBranchNext>
              <ChevronRightIcon size={14} />
            </MessageBranchNext>
          </MessageBranchSelector>
        </MessageBranch>
      </Message>
    </div>
  )
}
