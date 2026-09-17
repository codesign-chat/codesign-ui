<script module lang="ts">
  import type { CollapsibleRootProps } from '../../components/collapsible/collapsible-root.svelte'
  import { reasoningKey, useReasoning, type ReasoningContextValue } from './reasoning-context.svelte.ts'

  export { reasoningKey, useReasoning }
  export type { ReasoningContextValue }

  export interface ReasoningProps extends Omit<CollapsibleRootProps, 'onOpenChange'> {
    duration?: number
    isStreaming?: boolean
    onOpenChange?: (open: boolean) => void
  }
</script>

<script lang="ts">
  import { setContext } from 'svelte'
  import { CollapsibleRoot } from '../../components/collapsible/index.ts'

  const AUTO_CLOSE_DELAY = 1000
  const MS_IN_S = 1000

  let {
    defaultOpen,
    duration: durationProp,
    isStreaming = false,
    onOpenChange,
    open,
    ...rest
  }: ReasoningProps = $props()

  const resolvedDefaultOpen = defaultOpen ?? isStreaming
  const isExplicitlyClosed = defaultOpen === false

  let isOpen = $state(open ?? resolvedDefaultOpen)
  let duration = $state(durationProp)

  const setIsOpen = (next: boolean) => {
    isOpen = next
    onOpenChange?.(next)
  }

  let hasEverStreamed = isStreaming
  let startTime: number | null = null

  $effect(() => {
    if (isStreaming) {
      hasEverStreamed = true
      if (startTime === null) startTime = Date.now()
    } else if (startTime !== null) {
      duration = Math.ceil((Date.now() - startTime) / MS_IN_S)
      startTime = null
    }
  })

  $effect(() => {
    if (isStreaming && !isOpen && !isExplicitlyClosed) {
      setIsOpen(true)
    }
  })

  $effect(() => {
    if (hasEverStreamed && !isStreaming && isOpen) {
      const timer = setTimeout(() => setIsOpen(false), AUTO_CLOSE_DELAY)
      return () => clearTimeout(timer)
    }
  })

  setContext(reasoningKey, {
    get duration() {
      return duration
    },
    get isStreaming() {
      return isStreaming
    },
    get isOpen() {
      return isOpen
    },
    setIsOpen,
  })
</script>

<CollapsibleRoot {...rest} data-scope="reasoning" data-part="root" open={isOpen} onOpenChange={(details) => setIsOpen(details.open)} />
