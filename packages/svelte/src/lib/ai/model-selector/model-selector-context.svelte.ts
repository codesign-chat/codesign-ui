import { getContext } from 'svelte'

export interface ModelSelectorEntry {
  id: string
  onSelect?: (value: string) => void
  value: string
}

export interface ModelSelectorContextValue {
  close: () => void
  highlightedValue: string | null
  query: string
  registerItem: (entry: ModelSelectorEntry) => void
  selectValue: (value: string) => void
  setHighlightedValue: (value: string | null) => void
  setQuery: (query: string) => void
  unregisterItem: (value: string) => void
  visibleValues: string[]
}

export const modelSelectorKey: symbol = Symbol('model-selector')

export function useModelSelector(): ModelSelectorContextValue {
  const context = getContext<ModelSelectorContextValue>(modelSelectorKey)
  if (!context) {
    throw new Error('ModelSelector components must be used within ModelSelector')
  }
  return context
}

export function matchesQuery(value: string, query: string): boolean {
  return value.toLowerCase().includes(query.trim().toLowerCase())
}
