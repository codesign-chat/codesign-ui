<script lang="ts">
  interface TerminalActionsProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: TerminalActionsProps = $props()
</script>

<div {...rest} data-scope="terminal" data-part="actions">
  {@render children?.()}
</div>
