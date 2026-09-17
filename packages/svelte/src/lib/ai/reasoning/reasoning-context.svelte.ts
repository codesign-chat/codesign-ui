import { getContext } from 'svelte'

export const reasoningKey: symbol = Symbol('reasoning')

export interface ReasoningContextValue {
  duration: number | undefined
  isStreaming: boolean
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export function useReasoning(): ReasoningContextValue {
  const context = getContext<ReasoningContextValue>(reasoningKey)
  if (!context) {
    throw new Error('Reasoning components must be used within Reasoning')
  }
  return context
}
