import { Show, createContext, createSignal, splitProps, useContext } from 'solid-js'
import type { JSX } from 'solid-js'
import {
  DialogContent,
  DialogPositioner,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '../../components/dialog/index.ts'

const SCOPE = 'model-selector'

interface ModelSelectorEntry {
  id: string
  onSelect?: (value: string) => void
  value: string
}

interface ModelSelectorContextValue {
  close: () => void
  highlightedValue: () => string | null
  query: () => string
  registerItem: (entry: ModelSelectorEntry) => void
  selectValue: (value: string) => void
  setHighlightedValue: (value: string | null) => void
  setQuery: (query: string) => void
  unregisterItem: (value: string) => void
  visibleValues: () => string[]
}

const ModelSelectorContext = createContext<ModelSelectorContextValue>()

export function useModelSelector(): ModelSelectorContextValue {
  const context = useContext(ModelSelectorContext)
  if (!context) {
    throw new Error('ModelSelector components must be used within ModelSelector')
  }
  return context
}

const matchesQuery = (value: string, query: string) => value.toLowerCase().includes(query.trim().toLowerCase())

export type ModelSelectorProps = { children?: JSX.Element }

export function ModelSelector(props: ModelSelectorProps) {
  const [entries, setEntries] = createSignal<ModelSelectorEntry[]>([])
  const [query, setQueryState] = createSignal('')
  const [open, setOpen] = createSignal(false)
  const [highlighted, setHighlighted] = createSignal<string | null>(null)

  const registerItem = (entry: ModelSelectorEntry) => {
    setEntries((prev) => (prev.some((item) => item.value === entry.value) ? prev : [...prev, entry]))
  }

  const unregisterItem = (value: string) => {
    setEntries((prev) => prev.filter((item) => item.value !== value))
  }

  const visibleValues = () =>
    entries()
      .map((entry) => entry.value)
      .filter((value) => matchesQuery(value, query()))

  const setQuery = (nextQuery: string) => {
    setQueryState(nextQuery)
    const firstVisible = entries()
      .map((entry) => entry.value)
      .find((value) => matchesQuery(value, nextQuery))
    setHighlighted(firstVisible ?? null)
  }

  const selectValue = (value: string) => {
    entries()
      .find((item) => item.value === value)
      ?.onSelect?.(value)
  }

  return (
    <ModelSelectorContext.Provider
      value={{
        close: () => setOpen(false),
        highlightedValue: highlighted,
        query,
        registerItem,
        selectValue,
        setHighlightedValue: setHighlighted,
        setQuery,
        unregisterItem,
        visibleValues,
      }}
    >
      <DialogRoot onOpenChange={(details) => setOpen(details.open)} open={open()}>
        {props.children}
      </DialogRoot>
    </ModelSelectorContext.Provider>
  )
}

export type ModelSelectorTriggerProps = Record<string, unknown>

export function ModelSelectorTrigger(props: ModelSelectorTriggerProps) {
  return <DialogTrigger data-scope={SCOPE} data-part="trigger" {...(props as any)} />
}

export type ModelSelectorContentProps = {
  children?: JSX.Element
  title?: string
}

export function ModelSelectorContent(props: ModelSelectorContentProps) {
  // eslint-disable-next-line
  return (
    <DialogPositioner data-scope={SCOPE} data-part="positioner">
      <DialogContent data-scope={SCOPE} data-part="content">
        <DialogTitle data-scope={SCOPE} data-part="title">
          {props.title ?? 'Select a model'}
        </DialogTitle>
        {props.children}
      </DialogContent>
    </DialogPositioner>
  )
}

export type ModelSelectorInputProps = JSX.InputHTMLAttributes<HTMLInputElement>

export function ModelSelectorInput(props: ModelSelectorInputProps) {
  const [local, rest] = splitProps(props, ['onKeyDown', 'onInput'])
  const context = useModelSelector()

  const moveHighlight = (offset: number) => {
    const values = context.visibleValues()
    if (values.length === 0) {
      return
    }
    const currentIndex = context.highlightedValue() ? values.indexOf(context.highlightedValue() as string) : -1
    const nextIndex = (currentIndex + offset + values.length) % values.length
    context.setHighlightedValue(values[nextIndex])
  }

  return (
    <input
      aria-autocomplete="list"
      aria-controls="model-selector-list"
      aria-expanded={true}
      data-scope={SCOPE}
      data-part="input"
      onKeyDown={(event) => {
        ;(local.onKeyDown as any)?.(event)
        if (event.key === 'ArrowDown') {
          event.preventDefault()
          moveHighlight(1)
        } else if (event.key === 'ArrowUp') {
          event.preventDefault()
          moveHighlight(-1)
        } else if (event.key === 'Enter' && context.highlightedValue()) {
          event.preventDefault()
          context.selectValue(context.highlightedValue() as string)
          context.close()
        } else if (event.key === 'Home' && context.visibleValues().length > 0) {
          event.preventDefault()
          context.setHighlightedValue(context.visibleValues()[0])
        } else if (event.key === 'End' && context.visibleValues().length > 0) {
          event.preventDefault()
          const values = context.visibleValues()
          context.setHighlightedValue(values[values.length - 1])
        }
      }}
      onInput={(event) => {
        ;(local.onInput as any)?.(event)
        context.setQuery(event.currentTarget.value)
      }}
      placeholder="Search models…"
      role="combobox"
      type="text"
      {...rest}
    />
  )
}

export type ModelSelectorListProps = JSX.HTMLAttributes<HTMLDivElement>

export function ModelSelectorList(props: ModelSelectorListProps) {
  const context = useModelSelector()
  return (
    <div
      aria-activedescendant={
        context.highlightedValue()
          ? `model-selector-item-${context.visibleValues().indexOf(context.highlightedValue()!)}`
          : undefined
      }
      aria-label="Models"
      data-scope={SCOPE}
      data-part="list"
      id="model-selector-list"
      tabIndex={0}
      role="listbox"
      {...props}
    />
  )
}

export type ModelSelectorGroupProps = JSX.HTMLAttributes<HTMLDivElement> & { label: string }

export function ModelSelectorGroup(props: ModelSelectorGroupProps) {
  const [local, rest] = splitProps(props, ['label', 'children'])
  return (
    <div aria-label={local.label} data-scope={SCOPE} data-part="group" role="group" {...rest}>
      {local.children}
    </div>
  )
}

export type ModelSelectorGroupLabelProps = JSX.HTMLAttributes<HTMLDivElement>

export function ModelSelectorGroupLabel(props: ModelSelectorGroupLabelProps) {
  return <div data-scope={SCOPE} data-part="group-label" {...props} />
}

export type ModelSelectorItemProps = JSX.HTMLAttributes<HTMLDivElement> & {
  onSelect?: (value: string) => void
  value: string
}

export function ModelSelectorItem(props: ModelSelectorItemProps) {
  const [local, rest] = splitProps(props, ['onSelect', 'value', 'children', 'onMouseEnter'])
  const context = useModelSelector()
  const id = `model-selector-item-${context.visibleValues().indexOf(local.value)}`
  const highlighted = () => context.highlightedValue() === local.value

  context.registerItem({ id, onSelect: local.onSelect, value: local.value })

  return (
    <Show when={context.visibleValues().includes(local.value)}>
      <div
        aria-label={local.value}
        aria-selected={highlighted()}
        data-highlighted={highlighted()}
        data-scope={SCOPE}
        data-part="item"
        data-value={local.value}
        id={id}
        onClick={() => {
          context.selectValue(local.value)
          context.close()
        }}
        onMouseEnter={(event) => {
          ;(local.onMouseEnter as any)?.(event)
          context.setHighlightedValue(local.value)
        }}
        role="option"
        tabIndex={-1}
        {...(rest as any)}
      >
        {local.children}
      </div>
    </Show>
  )
}

export type ModelSelectorEmptyProps = JSX.HTMLAttributes<HTMLDivElement>

export function ModelSelectorEmpty(props: ModelSelectorEmptyProps) {
  const [local, rest] = splitProps(props, ['children'])
  const context = useModelSelector()
  return (
    <Show when={context.visibleValues().length === 0}>
      <div data-scope={SCOPE} data-part="empty" {...rest}>
        {local.children ?? 'No models found'}
      </div>
    </Show>
  )
}

export type ModelSelectorSeparatorProps = JSX.HTMLAttributes<HTMLDivElement>

export function ModelSelectorSeparator(props: ModelSelectorSeparatorProps) {
  return <div data-scope={SCOPE} data-part="separator" role="separator" {...props} />
}

export type ModelSelectorLogoProps = JSX.ImgHTMLAttributes<HTMLImageElement> & {
  provider: string
}

export function ModelSelectorLogo(props: ModelSelectorLogoProps) {
  const [local, rest] = splitProps(props, ['provider'])
  return (
    <img
      alt={`${local.provider} logo`}
      data-scope={SCOPE}
      data-part="logo"
      height={12}
      loading="lazy"
      src={`https://models.dev/logos/${local.provider}.svg`}
      width={12}
      {...rest}
    />
  )
}

export type ModelSelectorLogoGroupProps = JSX.HTMLAttributes<HTMLDivElement>

export function ModelSelectorLogoGroup(props: ModelSelectorLogoGroupProps) {
  return <div data-scope={SCOPE} data-part="logo-group" {...props} />
}

export type ModelSelectorNameProps = JSX.HTMLAttributes<HTMLSpanElement>

export function ModelSelectorName(props: ModelSelectorNameProps) {
  return <span data-scope={SCOPE} data-part="name" {...props} />
}

export type ModelSelectorShortcutProps = JSX.HTMLAttributes<HTMLSpanElement>

export function ModelSelectorShortcut(props: ModelSelectorShortcutProps) {
  return <span data-scope={SCOPE} data-part="shortcut" {...props} />
}
