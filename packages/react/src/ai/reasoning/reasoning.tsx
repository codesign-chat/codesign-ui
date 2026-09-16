import type { ComponentProps, ReactNode } from 'react'
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Collapsible } from '../../components/collapsible/index.ts'
import { Shimmer } from '../shimmer/index.ts'
import { useControllableState } from '../use-controllable-state.ts'

interface ReasoningContextValue {
  isStreaming: boolean
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  duration: number | undefined
}

const ReasoningContext = createContext<ReasoningContextValue | null>(null)

export function useReasoning() {
  const context = useContext(ReasoningContext)
  if (!context) {
    throw new Error('Reasoning components must be used within Reasoning')
  }
  return context
}

export type ReasoningProps = Omit<ComponentProps<typeof Collapsible.Root>, 'onOpenChange'> & {
  isStreaming?: boolean
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  duration?: number
}

const AUTO_CLOSE_DELAY = 1000
const MS_IN_S = 1000

export function Reasoning({
  isStreaming = false,
  open,
  defaultOpen,
  onOpenChange,
  duration: durationProp,
  children,
  ...props
}: ReasoningProps) {
  const resolvedDefaultOpen = defaultOpen ?? isStreaming
  // Track if defaultOpen was explicitly set to false (to prevent auto-open)
  const isExplicitlyClosed = defaultOpen === false

  const [isOpen, setIsOpen] = useControllableState<boolean>({
    defaultValue: resolvedDefaultOpen,
    onChange: onOpenChange,
    value: open,
  })
  const [duration, setDuration] = useControllableState<number | undefined>({
    defaultValue: undefined,
    value: durationProp,
  })

  const hasEverStreamedRef = useRef(isStreaming)
  const [hasAutoClosed, setHasAutoClosed] = useState(false)
  const startTimeRef = useRef<number | null>(null)

  // Track when streaming starts and compute duration
  useEffect(() => {
    if (isStreaming) {
      hasEverStreamedRef.current = true
      if (startTimeRef.current === null) {
        startTimeRef.current = Date.now()
      }
    } else if (startTimeRef.current !== null) {
      setDuration(Math.ceil((Date.now() - startTimeRef.current) / MS_IN_S))
      startTimeRef.current = null
    }
  }, [isStreaming, setDuration])

  // Auto-open when streaming starts (unless explicitly closed)
  useEffect(() => {
    if (isStreaming && !isOpen && !isExplicitlyClosed) {
      setIsOpen(true)
    }
  }, [isStreaming, isOpen, setIsOpen, isExplicitlyClosed])

  // Auto-close when streaming ends (once only, and only if it ever streamed)
  useEffect(() => {
    if (hasEverStreamedRef.current && !isStreaming && isOpen && !hasAutoClosed) {
      const timer = setTimeout(() => {
        setIsOpen(false)
        setHasAutoClosed(true)
      }, AUTO_CLOSE_DELAY)

      return () => clearTimeout(timer)
    }
  }, [isStreaming, isOpen, setIsOpen, hasAutoClosed])

  const handleOpenChange = useCallback(
    (details: { open: boolean }) => {
      setIsOpen(details.open)
    },
    [setIsOpen],
  )

  const contextValue = useMemo<ReasoningContextValue>(
    () => ({ duration, isOpen, isStreaming, setIsOpen }),
    [duration, isOpen, isStreaming, setIsOpen],
  )

  return (
    <ReasoningContext.Provider value={contextValue}>
      <Collapsible.Root
        data-scope="reasoning"
        data-part="root"
        onOpenChange={handleOpenChange}
        open={isOpen}
        {...props}
      >
        {children}
      </Collapsible.Root>
    </ReasoningContext.Provider>
  )
}

export type ReasoningTriggerProps = Omit<ComponentProps<typeof Collapsible.Trigger>, 'onOpenChange'> & {
  getThinkingMessage?: (isStreaming: boolean, duration?: number | undefined) => ReactNode
}

const defaultGetThinkingMessage = (isStreaming: boolean, duration?: number | undefined) => {
  if (isStreaming || duration === 0) {
    return <Shimmer>Thinking...</Shimmer>
  }
  if (duration === undefined) {
    return <p>Thought for a few seconds</p>
  }
  return <p>Thought for {duration} seconds</p>
}

export function ReasoningTrigger({
  children,
  getThinkingMessage = defaultGetThinkingMessage,
  ...props
}: ReasoningTriggerProps) {
  const { isStreaming, duration } = useReasoning()

  return (
    <Collapsible.Trigger data-scope="reasoning" data-part="trigger" {...props}>
      {children ?? getThinkingMessage(isStreaming, duration)}
    </Collapsible.Trigger>
  )
}

export type ReasoningContentProps = Omit<ComponentProps<typeof Collapsible.Content>, 'children'> & {
  children: string
}

export function ReasoningContent(props: ReasoningContentProps) {
  return <Collapsible.Content data-scope="reasoning" data-part="content" {...props} />
}
