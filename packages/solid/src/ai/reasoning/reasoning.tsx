import { createEffect, createSignal, onCleanup, splitProps } from 'solid-js'
import type { JSX } from 'solid-js'
import { createContext } from '../../utils/create-context.ts'
import { Collapsible } from '../../components/collapsible/index.ts'
import { Shimmer } from '../shimmer/shimmer.tsx'

const AUTO_CLOSE_DELAY = 1000
const MS_IN_S = 1000

interface ReasoningContextValue {
  duration: number | undefined
  isStreaming: boolean
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const [ReasoningProvider, useReasoningContext] = createContext<ReasoningContextValue>({
  hookName: 'useReasoning',
  providerName: '<Reasoning />',
})

export function useReasoning(): ReasoningContextValue {
  return useReasoningContext()
}

export type ReasoningProps = JSX.HTMLAttributes<HTMLDivElement> & {
  defaultOpen?: boolean
  duration?: number
  isStreaming?: boolean
  onOpenChange?: (open: boolean) => void
  open?: boolean
}

export function Reasoning(props: ReasoningProps) {
  const [local, rest] = splitProps(props, ['defaultOpen', 'duration', 'isStreaming', 'onOpenChange', 'open'])
  const isStreaming = () => local.isStreaming ?? false
  const resolvedDefaultOpen = local.defaultOpen ?? isStreaming()
  // Track if defaultOpen was explicitly set to false (to prevent auto-open)
  const isExplicitlyClosed = local.defaultOpen === false

  const [isOpen, setIsOpenRaw] = createSignal(local.open ?? resolvedDefaultOpen)
  const setIsOpen = (open: boolean) => {
    setIsOpenRaw(open)
    local.onOpenChange?.(open)
  }

  const [duration, setDuration] = createSignal(local.duration)

  let hasEverStreamed = isStreaming()
  let startTime: number | null = null

  // Track when streaming starts and compute duration
  createEffect(() => {
    if (isStreaming()) {
      hasEverStreamed = true
      if (startTime === null) {
        startTime = Date.now()
      }
    } else if (startTime !== null) {
      setDuration(Math.ceil((Date.now() - startTime) / MS_IN_S))
      startTime = null
    }
  })

  // Auto-open when streaming starts (unless explicitly closed)
  createEffect(() => {
    if (isStreaming() && !isOpen() && !isExplicitlyClosed) {
      setIsOpen(true)
    }
  })

  // Auto-close when streaming ends (once only, and only if it ever streamed)
  createEffect(() => {
    if (hasEverStreamed && !isStreaming() && isOpen()) {
      const timer = setTimeout(() => setIsOpen(false), AUTO_CLOSE_DELAY)
      onCleanup(() => clearTimeout(timer))
    }
  })

  const contextValue: ReasoningContextValue = {
    get duration() {
      return duration()
    },
    get isStreaming() {
      return isStreaming()
    },
    get isOpen() {
      return isOpen()
    },
    setIsOpen,
  }

  return (
    <ReasoningProvider value={contextValue}>
      <Collapsible.Root
        data-scope="reasoning"
        data-part="root"
        onOpenChange={(details) => setIsOpen(details.open)}
        open={isOpen()}
        {...rest}
      />
    </ReasoningProvider>
  )
}

export type ReasoningTriggerProps = JSX.HTMLAttributes<HTMLButtonElement> & {
  getThinkingMessage?: (isStreaming: boolean, duration?: number | undefined) => JSX.Element
}

export function ReasoningTrigger(props: ReasoningTriggerProps) {
  const [local, rest] = splitProps(props, ['children', 'getThinkingMessage'])
  const { duration, isStreaming } = useReasoning()

  const defaultThinkingMessage = () => {
    if (isStreaming || duration === 0) {
      return <Shimmer>Thinking...</Shimmer>
    }
    if (duration === undefined) {
      return <p>Thought for a few seconds</p>
    }
    return <p>Thought for {duration} seconds</p>
  }

  return (
    <Collapsible.Trigger data-scope="reasoning" data-part="trigger" {...rest}>
      {local.children ?? local.getThinkingMessage?.(isStreaming, duration) ?? defaultThinkingMessage()}
    </Collapsible.Trigger>
  )
}

export type ReasoningContentProps = JSX.HTMLAttributes<HTMLDivElement> & {
  children: string
}

export function ReasoningContent(props: ReasoningContentProps) {
  return <Collapsible.Content data-scope="reasoning" data-part="content" {...props} />
}
