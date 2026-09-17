<script lang="ts">
  interface ArtifactDescriptionProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: ArtifactDescriptionProps = $props()
</script>

<p {...rest} data-scope="artifact" data-part="description">
  {@render children?.()}
</p>
