<script lang="ts">
  interface TerminalTitleProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: TerminalTitleProps = $props()
</script>

<div {...rest} data-scope="terminal" data-part="title">
  {#if children}
    {@render children()}
  {:else}
    Terminal
  {/if}
</div>
