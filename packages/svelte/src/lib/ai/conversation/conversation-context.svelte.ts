import { getContext } from 'svelte'

export const conversationKey: symbol = Symbol('conversation')

export interface ConversationContextValue {
  isAtBottom: boolean
  scrollToBottom: () => void
}

export function useConversationContext(): ConversationContextValue {
  const context = getContext<ConversationContextValue>(conversationKey)
  if (!context) {
    throw new Error('Conversation components must be used within Conversation')
  }
  return context
}
