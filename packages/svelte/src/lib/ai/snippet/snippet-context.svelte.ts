import { getContext } from 'svelte'

export interface SnippetContextValue {
  code: string
}

export const snippetKey: symbol = Symbol('snippet')

export function useSnippet(): SnippetContextValue {
  const context = getContext<SnippetContextValue>(snippetKey)
  if (!context) {
    throw new Error('Snippet parts must be used within Snippet')
  }
  return context
}
