import { getContext } from 'svelte'

export interface TerminalContextValue {
  autoScroll: boolean
  isStreaming: boolean
  onClear?: () => void
  output: string
}

export const terminalKey: symbol = Symbol('terminal')

export function useTerminal(): TerminalContextValue {
  const context = getContext<TerminalContextValue>(terminalKey)
  if (!context) {
    throw new Error('Terminal parts must be used within Terminal')
  }
  return context
}
