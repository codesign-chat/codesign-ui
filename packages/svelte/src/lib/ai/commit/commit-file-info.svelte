<script lang="ts">
  interface CommitFileInfoProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: CommitFileInfoProps = $props()
</script>

<div {...rest} data-scope="commit" data-part="file-info">
  {@render children?.()}
</div>
