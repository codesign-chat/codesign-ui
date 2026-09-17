<script lang="ts">
  import { setContext } from 'svelte'
  import { parseStackTrace, stackTraceKey } from './stack-trace-context.svelte.ts'

  interface StackTraceProps {
    defaultOpen?: boolean
    onFilePathClick?: (filePath: string, line?: number, column?: number) => void
    onOpenChange?: (open: boolean) => void
    trace: string
    children?: import('svelte').Snippet
  }

  let { defaultOpen = false, onFilePathClick, onOpenChange, trace, children, ...rest }: StackTraceProps = $props()

  let isOpen = $state(defaultOpen)

  const setIsOpen = (next: boolean) => {
    isOpen = next
    onOpenChange?.(next)
  }

  setContext(stackTraceKey, {
    get isOpen() {
      return isOpen
    },
    onFilePathClick,
    raw: trace,
    setIsOpen,
    trace: parseStackTrace(trace),
  })
</script>

<div {...rest} data-scope="stack-trace" data-part="root">
  {@render children?.()}
</div>
