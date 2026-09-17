<script lang="ts">
  interface ArtifactActionsProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: ArtifactActionsProps = $props()
</script>

<div {...rest} data-scope="artifact" data-part="actions">
  {@render children?.()}
</div>
