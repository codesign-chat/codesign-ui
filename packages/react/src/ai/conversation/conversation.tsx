import type { ComponentProps, HTMLAttributes, ReactNode } from 'react'
import { StickToBottom, useStickToBottomContext } from 'use-stick-to-bottom'

export type ConversationProps = ComponentProps<typeof StickToBottom>

export function Conversation(props: ConversationProps) {
  return <StickToBottom data-scope="conversation" data-part="root" role="log" {...props} />
}

export type ConversationContentProps = ComponentProps<typeof StickToBottom.Content>

export function ConversationContent(props: ConversationContentProps) {
  return <StickToBottom.Content data-scope="conversation" data-part="content" {...props} />
}

export interface ConversationEmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  icon?: ReactNode
}

export function ConversationEmptyState({
  title = 'No messages yet',
  description = 'Start a conversation to see messages here',
  icon,
  children,
  ...props
}: ConversationEmptyStateProps) {
  return (
    <div data-scope="conversation" data-part="empty-state" {...props}>
      {children ?? (
        <>
          {icon && <div data-part="empty-state-icon">{icon}</div>}
          <div data-part="empty-state-title">{title}</div>
          <div data-part="empty-state-description">{description}</div>
        </>
      )}
    </div>
  )
}

export type ConversationScrollToBottomProps = ComponentProps<'button'>

export function ConversationScrollToBottom(props: ConversationScrollToBottomProps) {
  const { isAtBottom, scrollToBottom } = useStickToBottomContext()
  return (
    <button
      type="button"
      data-scope="conversation"
      data-part="scroll-to-bottom"
      data-state={isAtBottom ? 'at-bottom' : 'detached'}
      onClick={() => scrollToBottom()}
      {...props}
    />
  )
}

export const useConversationContext = useStickToBottomContext
