import { getContext } from 'svelte'

export interface CodeBlockContextValue {
  code: string
}

export const codeBlockKey: symbol = Symbol('code-block')

export function useCodeBlock(): CodeBlockContextValue {
  const context = getContext<CodeBlockContextValue>(codeBlockKey)
  if (!context) {
    throw new Error('CodeBlock parts must be used within CodeBlock')
  }
  return context
}
