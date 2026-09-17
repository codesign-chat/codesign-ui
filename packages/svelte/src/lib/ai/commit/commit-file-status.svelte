<script lang="ts">
  interface CommitFileStatusProps {
    status: 'added' | 'deleted' | 'modified' | 'renamed'
    children?: import('svelte').Snippet
  }

  let { status, children, ...rest }: CommitFileStatusProps = $props()

  const labels = { added: 'A', deleted: 'D', modified: 'M', renamed: 'R' } as const
</script>

<span {...rest} data-scope="commit" data-part="file-status" data-status={status}>
  {#if children}
    {@render children()}
  {:else}
    {labels[status]}
  {/if}
</span>
