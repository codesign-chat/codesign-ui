<script lang="ts">
  import { useTerminal } from './terminal-context.svelte.ts'

  interface TerminalClearButtonProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: TerminalClearButtonProps = $props()
  const { onClear } = useTerminal()

  const handleClick = () => {
    onClear?.()
  }
</script>

{#if onClear}
  <button {...rest} aria-label="Clear" data-scope="terminal" data-part="clear-button" onclick={handleClick} type="button">
    {@render children?.()}
  </button>
{/if}
