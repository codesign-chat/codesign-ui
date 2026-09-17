<script lang="ts">
  import { useStackTrace } from './stack-trace-context.svelte.ts'

  interface StackTraceErrorMessageProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: StackTraceErrorMessageProps = $props()
  const { trace } = useStackTrace()
</script>

<span {...rest} data-scope="stack-trace" data-part="error-message">
  {#if children}
    {@render children()}
  {:else}
    {trace.errorMessage}
  {/if}
</span>
