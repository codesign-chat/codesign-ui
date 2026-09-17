<script lang="ts">
  interface TerminalHeaderProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: TerminalHeaderProps = $props()
</script>

<div {...rest} data-scope="terminal" data-part="header">
  {@render children?.()}
</div>
