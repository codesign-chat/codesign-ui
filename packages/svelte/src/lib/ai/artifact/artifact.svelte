<script lang="ts">
  interface ArtifactProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: ArtifactProps = $props()
</script>

<div {...rest} data-scope="artifact" data-part="root">
  {@render children?.()}
</div>
