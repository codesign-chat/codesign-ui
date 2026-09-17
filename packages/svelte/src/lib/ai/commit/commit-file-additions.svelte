<script lang="ts">
  interface CommitFileAdditionsProps {
    count: number
    children?: import('svelte').Snippet
  }

  let { count, children, ...rest }: CommitFileAdditionsProps = $props()
</script>

{#if count > 0}
  <span {...rest} data-scope="commit" data-part="file-additions">
    {#if children}
      {@render children()}
    {:else}
      +{count}
    {/if}
  </span>
{/if}
