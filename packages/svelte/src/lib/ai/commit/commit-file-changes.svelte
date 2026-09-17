<script lang="ts">
  interface CommitFileChangesProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: CommitFileChangesProps = $props()
</script>

<div {...rest} data-scope="commit" data-part="file-changes">
  {@render children?.()}
</div>
