<script lang="ts">
  interface ArtifactHeaderProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: ArtifactHeaderProps = $props()
</script>

<div {...rest} data-scope="artifact" data-part="header">
  {@render children?.()}
</div>
