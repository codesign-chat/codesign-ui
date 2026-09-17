<script lang="ts">
  interface CommitFileDeletionsProps {
    count: number
    children?: import('svelte').Snippet
  }

  let { count, children, ...rest }: CommitFileDeletionsProps = $props()
</script>

{#if count > 0}
  <span {...rest} data-scope="commit" data-part="file-deletions">
    {#if children}
      {@render children()}
    {:else}
      -{count}
    {/if}
  </span>
{/if}
