<script lang="ts">
  interface ArtifactContentProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: ArtifactContentProps = $props()
</script>

<div {...rest} data-scope="artifact" data-part="content">
  {@render children?.()}
</div>
