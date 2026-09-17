<script lang="ts">
  import { useTerminal } from './terminal-context.svelte.ts'

  interface TerminalStatusProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: TerminalStatusProps = $props()
  const { isStreaming } = useTerminal()
</script>

{#if isStreaming}
  <div {...rest} data-scope="terminal" data-part="status">
    {@render children?.()}
  </div>
{/if}
