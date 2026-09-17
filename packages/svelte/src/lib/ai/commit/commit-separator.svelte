<script lang="ts">
  interface CommitSeparatorProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: CommitSeparatorProps = $props()
</script>

<span {...rest} data-scope="commit" data-part="separator">
  {#if children}
    {@render children()}
  {:else}
    •
  {/if}
</span>
