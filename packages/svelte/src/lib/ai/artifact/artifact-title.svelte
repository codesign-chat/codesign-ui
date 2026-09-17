<script lang="ts">
  interface ArtifactTitleProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: ArtifactTitleProps = $props()
</script>

<p {...rest} data-scope="artifact" data-part="title">
  {@render children?.()}
</p>
