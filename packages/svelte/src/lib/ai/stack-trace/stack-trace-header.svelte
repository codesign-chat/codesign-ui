<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import { useStackTrace } from './stack-trace-context.svelte.ts'

  interface StackTraceHeaderProps extends HTMLAttributes<HTMLDivElement> {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: StackTraceHeaderProps = $props()
  const { isOpen, setIsOpen } = useStackTrace()

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.target === event.currentTarget && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault()
      setIsOpen(!isOpen)
    }
  }
</script>

<div
  {...rest}
  aria-expanded={isOpen}
  data-scope="stack-trace"
  data-part="header"
  onclick={() => setIsOpen(!isOpen)}
  onkeydown={handleKeyDown}
  role="button"
  tabindex="0"
>
  {@render children?.()}
</div>
