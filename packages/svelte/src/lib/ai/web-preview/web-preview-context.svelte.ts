import { getContext } from 'svelte'

export interface WebPreviewContextValue {
  consoleOpen: boolean
  setConsoleOpen: (open: boolean) => void
  setUrl: (url: string) => void
  url: string
}

export const webPreviewKey: symbol = Symbol('web-preview')

export function useWebPreview(): WebPreviewContextValue {
  const context = getContext<WebPreviewContextValue>(webPreviewKey)
  if (!context) {
    throw new Error('WebPreview components must be used within WebPreview')
  }
  return context
}
