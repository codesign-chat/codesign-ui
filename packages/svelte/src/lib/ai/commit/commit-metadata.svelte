<script lang="ts">
  interface CommitMetadataProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: CommitMetadataProps = $props()
</script>

<div {...rest} data-scope="commit" data-part="metadata">
  {@render children?.()}
</div>
