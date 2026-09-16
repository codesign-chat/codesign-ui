import type { ComponentProps, ReactNode } from 'react'
import { createContext, useContext, useMemo } from 'react'
import { Collapsible } from '../../components/collapsible/index.ts'
import { useControllableState } from '../use-controllable-state.ts'

const SCOPE = 'chain-of-thought'

const CheckIcon = () => (
  <svg
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

const LoaderIcon = () => (
  <svg aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
)

const PendingIcon = () => (
  <svg
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeDasharray="4 3"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="9" />
  </svg>
)

const ChevronDownIcon = () => (
  <svg
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
)

interface ChainOfThoughtContextValue {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const ChainOfThoughtContext = createContext<ChainOfThoughtContextValue | null>(null)

function useChainOfThought() {
  const context = useContext(ChainOfThoughtContext)
  if (!context) {
    throw new Error('ChainOfThought components must be used within ChainOfThought')
  }
  return context
}

export type ChainOfThoughtProps = ComponentProps<'div'> & {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function ChainOfThought({ open, defaultOpen = false, onOpenChange, children, ...props }: ChainOfThoughtProps) {
  const [isOpen, setIsOpen] = useControllableState({
    defaultValue: defaultOpen,
    onChange: onOpenChange,
    value: open,
  })

  const contextValue = useMemo<ChainOfThoughtContextValue>(() => ({ isOpen, setIsOpen }), [isOpen, setIsOpen])

  return (
    <ChainOfThoughtContext.Provider value={contextValue}>
      <div data-scope="chain-of-thought" data-part="root" {...props}>
        {children}
      </div>
    </ChainOfThoughtContext.Provider>
  )
}

export type ChainOfThoughtHeaderProps = ComponentProps<'button'>

export function ChainOfThoughtHeader({ children, ...props }: ChainOfThoughtHeaderProps) {
  const { isOpen, setIsOpen } = useChainOfThought()

  return (
    <Collapsible.Root onOpenChange={(details) => setIsOpen(details.open)} open={isOpen}>
      <Collapsible.Trigger data-scope={SCOPE} data-part="trigger" {...props}>
        {children ?? 'Chain of Thought'}
        <ChevronDownIcon />
      </Collapsible.Trigger>
    </Collapsible.Root>
  )
}

export type ChainOfThoughtStepProps = ComponentProps<'div'> & {
  icon?: ReactNode
  label: ReactNode
  description?: ReactNode
  status?: 'complete' | 'active' | 'pending'
}

export function ChainOfThoughtStep({
  icon,
  label,
  description,
  status = 'complete',
  children,
  ...props
}: ChainOfThoughtStepProps) {
  return (
    <div data-scope={SCOPE} data-part="step" data-status={status} {...props}>
      <div data-scope={SCOPE} data-part="step-marker">
        {icon ?? (status === 'complete' ? <CheckIcon /> : status === 'active' ? <LoaderIcon /> : <PendingIcon />)}
      </div>
      <div data-scope={SCOPE} data-part="step-body">
        <div data-scope={SCOPE} data-part="step-label">
          {label}
        </div>
        {description && (
          <div data-scope={SCOPE} data-part="step-description">
            {description}
          </div>
        )}
        {children}
      </div>
    </div>
  )
}

export type ChainOfThoughtSearchResultsProps = ComponentProps<'div'>

export function ChainOfThoughtSearchResults(props: ChainOfThoughtSearchResultsProps) {
  return <div data-scope="chain-of-thought" data-part="search-results" {...props} />
}

export type ChainOfThoughtSearchResultProps = ComponentProps<'span'>

export function ChainOfThoughtSearchResult(props: ChainOfThoughtSearchResultProps) {
  return <span data-scope="chain-of-thought" data-part="search-result" {...props} />
}

export type ChainOfThoughtContentProps = ComponentProps<typeof Collapsible.Content>

export function ChainOfThoughtContent(props: ChainOfThoughtContentProps) {
  const { isOpen } = useChainOfThought()

  return (
    <Collapsible.Root open={isOpen}>
      <Collapsible.Content data-scope="chain-of-thought" data-part="content" {...props} />
    </Collapsible.Root>
  )
}

export type ChainOfThoughtImageProps = ComponentProps<'div'> & {
  caption?: string
}

export function ChainOfThoughtImage({ caption, children, ...props }: ChainOfThoughtImageProps) {
  return (
    <div data-scope={SCOPE} data-part="image" {...props}>
      <div data-scope={SCOPE} data-part="image-frame">
        {children}
      </div>
      {caption && (
        <p data-scope={SCOPE} data-part="image-caption">
          {caption}
        </p>
      )}
    </div>
  )
}
