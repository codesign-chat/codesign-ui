import { Show, createSignal, splitProps } from 'solid-js'
import type { JSX } from 'solid-js'
import { Collapsible } from '../../components/collapsible/index.ts'

const SCOPE = 'chain-of-thought'

interface ChainOfThoughtContextValue {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

let currentContext: ChainOfThoughtContextValue | undefined

export function useChainOfThought(): ChainOfThoughtContextValue {
  if (!currentContext) {
    throw new Error('ChainOfThought components must be used within ChainOfThought')
  }
  return currentContext
}

export type ChainOfThoughtProps = JSX.HTMLAttributes<HTMLDivElement> & {
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  open?: boolean
}

export function ChainOfThought(props: ChainOfThoughtProps) {
  const [local, rest] = splitProps(props, ['defaultOpen', 'onOpenChange', 'open'])
  const [isOpen, setIsOpenRaw] = createSignal(local.open ?? local.defaultOpen ?? false)
  const setIsOpen = (open: boolean) => {
    setIsOpenRaw(open)
    local.onOpenChange?.(open)
  }
  currentContext = {
    get isOpen() {
      return isOpen()
    },
    setIsOpen,
  }

  return (
    <div data-scope={SCOPE} data-part="root" {...rest}>
      {props.children}
    </div>
  )
}

export type ChainOfThoughtHeaderProps = JSX.HTMLAttributes<HTMLButtonElement> & {
  indicator?: JSX.Element
}

export function ChainOfThoughtHeader(props: ChainOfThoughtHeaderProps) {
  const [local, rest] = splitProps(props, ['children', 'indicator'])
  const { isOpen, setIsOpen } = useChainOfThought()

  return (
    <Collapsible.Root onOpenChange={(details) => setIsOpen(details.open)} open={isOpen}>
      <Collapsible.Trigger data-scope={SCOPE} data-part="trigger" {...rest}>
        {local.children ?? 'Chain of Thought'}
        {local.indicator}
      </Collapsible.Trigger>
    </Collapsible.Root>
  )
}

export type ChainOfThoughtStepProps = JSX.HTMLAttributes<HTMLDivElement> & {
  description?: string
  icon?: JSX.Element
  label: string
  status?: 'active' | 'complete' | 'pending'
}

export function ChainOfThoughtStep(props: ChainOfThoughtStepProps) {
  const [local, rest] = splitProps(props, ['description', 'icon', 'label', 'status', 'children'])
  const status = () => local.status ?? 'complete'

  return (
    <div data-scope={SCOPE} data-part="step" data-status={status()} {...rest}>
      <div data-scope={SCOPE} data-part="step-marker">
        {local.icon}
      </div>
      <div data-scope={SCOPE} data-part="step-body">
        <div data-scope={SCOPE} data-part="step-label">
          {local.label}
        </div>
        <Show when={local.description}>
          <div data-scope={SCOPE} data-part="step-description">
            {local.description}
          </div>
        </Show>
        {local.children}
      </div>
    </div>
  )
}

export type ChainOfThoughtSearchResultsProps = JSX.HTMLAttributes<HTMLDivElement>

export function ChainOfThoughtSearchResults(props: ChainOfThoughtSearchResultsProps) {
  return <div data-scope={SCOPE} data-part="search-results" {...props} />
}

export type ChainOfThoughtSearchResultProps = JSX.HTMLAttributes<HTMLSpanElement>

export function ChainOfThoughtSearchResult(props: ChainOfThoughtSearchResultProps) {
  return <span data-scope={SCOPE} data-part="search-result" {...props} />
}

export type ChainOfThoughtContentProps = JSX.HTMLAttributes<HTMLDivElement>

export function ChainOfThoughtContent(props: ChainOfThoughtContentProps) {
  const { isOpen } = useChainOfThought()
  return (
    <Collapsible.Root open={isOpen}>
      <Collapsible.Content data-scope={SCOPE} data-part="content" {...props} />
    </Collapsible.Root>
  )
}

export type ChainOfThoughtImageProps = JSX.HTMLAttributes<HTMLDivElement> & {
  caption?: string
}

export function ChainOfThoughtImage(props: ChainOfThoughtImageProps) {
  const [local, rest] = splitProps(props, ['caption', 'children'])
  return (
    <div data-scope={SCOPE} data-part="image" {...rest}>
      <div data-scope={SCOPE} data-part="image-frame">
        {local.children}
      </div>
      <Show when={local.caption}>
        <p data-scope={SCOPE} data-part="image-caption">
          {local.caption}
        </p>
      </Show>
    </div>
  )
}
