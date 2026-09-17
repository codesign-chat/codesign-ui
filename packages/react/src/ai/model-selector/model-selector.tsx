import type { ComponentProps, ReactNode } from 'react'
import { createContext, useCallback, useContext, useEffect, useId, useMemo, useRef, useState } from 'react'
import { Dialog, useDialogContext } from '../../components/dialog/index.ts'

const SCOPE = 'model-selector'

interface ModelSelectorEntry {
  id: string
  onSelect?: (value: string) => void
  value: string
}

interface ModelSelectorContextValue {
  highlightedValue: string | null
  query: string
  registerItem: (entry: ModelSelectorEntry) => void
  selectValue: (value: string) => void
  setHighlightedValue: (value: string | null) => void
  setQuery: (query: string) => void
  unregisterItem: (value: string) => void
  visibleValues: string[]
}

const ModelSelectorContext = createContext<ModelSelectorContextValue | null>(null)

function useModelSelector() {
  const context = useContext(ModelSelectorContext)
  if (!context) {
    throw new Error('ModelSelector components must be used within ModelSelector')
  }
  return context
}

function matchesQuery(value: string, query: string) {
  return value.toLowerCase().includes(query.trim().toLowerCase())
}

export type ModelSelectorProps = ComponentProps<typeof Dialog.Root>

export function ModelSelector(props: ModelSelectorProps) {
  const [entries, setEntries] = useState<ModelSelectorEntry[]>([])
  const [query, setQueryState] = useState('')
  const [highlightedValue, setHighlightedValue] = useState<string | null>(null)
  const entriesRef = useRef(entries)
  entriesRef.current = entries

  const registerItem = useCallback((entry: ModelSelectorEntry) => {
    setEntries((prev) => (prev.some((item) => item.value === entry.value) ? prev : [...prev, entry]))
  }, [])

  const unregisterItem = useCallback((value: string) => {
    setEntries((prev) => prev.filter((item) => item.value !== value))
  }, [])

  const visibleValues = useMemo(
    () => entries.map((entry) => entry.value).filter((value) => matchesQuery(value, query)),
    [entries, query],
  )

  const setQuery = useCallback((nextQuery: string) => {
    setQueryState(nextQuery)
    const firstVisible = entriesRef.current.map((entry) => entry.value).find((value) => matchesQuery(value, nextQuery))
    setHighlightedValue(firstVisible ?? null)
  }, [])

  const selectValue = useCallback((value: string) => {
    const entry = entriesRef.current.find((item) => item.value === value)
    entry?.onSelect?.(value)
  }, [])

  const contextValue = useMemo<ModelSelectorContextValue>(
    () => ({
      highlightedValue,
      query,
      registerItem,
      selectValue,
      setHighlightedValue,
      setQuery,
      unregisterItem,
      visibleValues,
    }),
    [highlightedValue, query, registerItem, selectValue, setQuery, unregisterItem, visibleValues],
  )

  return (
    <ModelSelectorContext.Provider value={contextValue}>
      <Dialog.Root data-scope={SCOPE} data-part="root" {...props} />
    </ModelSelectorContext.Provider>
  )
}

export type ModelSelectorTriggerProps = ComponentProps<typeof Dialog.Trigger>

export function ModelSelectorTrigger(props: ModelSelectorTriggerProps) {
  return <Dialog.Trigger data-scope={SCOPE} data-part="trigger" {...props} />
}

export type ModelSelectorContentProps = ComponentProps<typeof Dialog.Content> & {
  title?: ReactNode
}

export function ModelSelectorContent({ title = 'Select a model', children, ...props }: ModelSelectorContentProps) {
  return (
    <Dialog.Positioner data-scope={SCOPE} data-part="positioner">
      <Dialog.Content data-scope={SCOPE} data-part="content" {...props}>
        <Dialog.Title data-scope={SCOPE} data-part="title">
          {title}
        </Dialog.Title>
        {children}
      </Dialog.Content>
    </Dialog.Positioner>
  )
}

export type ModelSelectorInputProps = Omit<ComponentProps<'input'>, 'onChange' | 'value'> & {
  placeholder?: string
}

export function ModelSelectorInput({ placeholder = 'Search models…', ...props }: ModelSelectorInputProps) {
  const { highlightedValue, query, selectValue, setHighlightedValue, setQuery, visibleValues } = useModelSelector()
  const dialog = useDialogContext()

  const moveHighlight = (offset: number) => {
    if (visibleValues.length === 0) {
      return
    }
    const currentIndex = highlightedValue ? visibleValues.indexOf(highlightedValue) : -1
    const nextIndex = (currentIndex + offset + visibleValues.length) % visibleValues.length
    setHighlightedValue(visibleValues[nextIndex])
  }

  return (
    <input
      aria-activedescendant={
        highlightedValue ? `model-selector-item-${visibleValues.indexOf(highlightedValue)}` : undefined
      }
      aria-controls="model-selector-list"
      aria-expanded
      data-scope={SCOPE}
      data-part="input"
      onChange={(event) => setQuery(event.target.value)}
      onKeyDown={(event) => {
        if (event.key === 'ArrowDown') {
          event.preventDefault()
          moveHighlight(1)
        } else if (event.key === 'ArrowUp') {
          event.preventDefault()
          moveHighlight(-1)
        } else if (event.key === 'Enter' && highlightedValue) {
          event.preventDefault()
          selectValue(highlightedValue)
          dialog.setOpen(false)
        } else if (event.key === 'Home' && visibleValues.length > 0) {
          event.preventDefault()
          setHighlightedValue(visibleValues[0])
        } else if (event.key === 'End' && visibleValues.length > 0) {
          event.preventDefault()
          setHighlightedValue(visibleValues[visibleValues.length - 1])
        }
      }}
      placeholder={placeholder}
      role="combobox"
      value={query}
      {...props}
    />
  )
}

export type ModelSelectorListProps = ComponentProps<'div'>

export function ModelSelectorList(props: ModelSelectorListProps) {
  return <div data-scope={SCOPE} data-part="list" id="model-selector-list" role="listbox" {...props} />
}

export type ModelSelectorGroupProps = ComponentProps<'div'> & {
  label?: ReactNode
}

export function ModelSelectorGroup({ label, children, ...props }: ModelSelectorGroupProps) {
  return (
    <div data-scope={SCOPE} data-part="group" role="presentation" {...props}>
      {label && (
        <span data-scope={SCOPE} data-part="group-label">
          {label}
        </span>
      )}
      {children}
    </div>
  )
}

export type ModelSelectorItemProps = Omit<ComponentProps<'div'>, 'onSelect'> & {
  onSelect?: (value: string) => void
  value: string
}

export function ModelSelectorItem({ onSelect, value, onMouseEnter, ...props }: ModelSelectorItemProps) {
  const { highlightedValue, registerItem, selectValue, setHighlightedValue, unregisterItem, visibleValues } =
    useModelSelector()
  const dialog = useDialogContext()
  const id = useId()
  const highlighted = highlightedValue === value

  useEffect(() => {
    registerItem({ id, onSelect, value })
    return () => unregisterItem(value)
  }, [id, onSelect, registerItem, unregisterItem, value])

  useEffect(() => {
    if (highlighted) {
      document.getElementById(id)?.scrollIntoView({ block: 'nearest' })
    }
  }, [highlighted, id])

  if (!visibleValues.includes(value)) {
    return null
  }

  return (
    <div
      aria-label={value}
      aria-selected={highlighted}
      data-highlighted={highlighted}
      tabIndex={-1}
      data-scope={SCOPE}
      data-part="item"
      data-value={value}
      id={`model-selector-item-${visibleValues.indexOf(value)}`}
      onClick={() => {
        selectValue(value)
        dialog.setOpen(false)
      }}
      onMouseEnter={(event) => {
        onMouseEnter?.(event)
        setHighlightedValue(value)
      }}
      role="option"
      {...props}
    />
  )
}

export type ModelSelectorEmptyProps = ComponentProps<'div'>

export function ModelSelectorEmpty({ children = 'No models found', ...props }: ModelSelectorEmptyProps) {
  const { visibleValues } = useModelSelector()

  if (visibleValues.length > 0) {
    return null
  }

  return (
    <div data-scope={SCOPE} data-part="empty" {...props}>
      {children}
    </div>
  )
}

export type ModelSelectorSeparatorProps = ComponentProps<'div'>

export function ModelSelectorSeparator(props: ModelSelectorSeparatorProps) {
  return <div data-scope={SCOPE} data-part="separator" role="separator" {...props} />
}

export type ModelSelectorLogoProps = Omit<ComponentProps<'img'>, 'alt' | 'src'> & {
  provider: string
}

export function ModelSelectorLogo({ provider, ...props }: ModelSelectorLogoProps) {
  return (
    <img
      alt={`${provider} logo`}
      data-scope={SCOPE}
      data-part="logo"
      height={12}
      loading="lazy"
      src={`https://models.dev/logos/${provider}.svg`}
      width={12}
      {...props}
    />
  )
}

export type ModelSelectorLogoGroupProps = ComponentProps<'div'>

export function ModelSelectorLogoGroup(props: ModelSelectorLogoGroupProps) {
  return <div data-scope={SCOPE} data-part="logo-group" {...props} />
}

export type ModelSelectorNameProps = ComponentProps<'span'>

export function ModelSelectorName(props: ModelSelectorNameProps) {
  return <span data-scope={SCOPE} data-part="name" {...props} />
}

export type ModelSelectorShortcutProps = ComponentProps<'span'>

export function ModelSelectorShortcut(props: ModelSelectorShortcutProps) {
  return <span data-scope={SCOPE} data-part="shortcut" {...props} />
}
