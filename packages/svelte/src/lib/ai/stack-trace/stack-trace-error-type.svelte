<script lang="ts">
  import { useStackTrace } from './stack-trace-context.svelte.ts'

  interface StackTraceErrorTypeProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: StackTraceErrorTypeProps = $props()
  const { trace } = useStackTrace()
</script>

{#if trace.errorType}
  <span {...rest} data-scope="stack-trace" data-part="error-type">
    {#if children}
      {@render children()}
    {:else}
      {trace.errorType}
    {/if}
  </span>
{/if}
