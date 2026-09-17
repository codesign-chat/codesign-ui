<script lang="ts">
  interface MSGroupLabelProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: MSGroupLabelProps = $props()
</script>

<div {...rest} data-scope="model-selector" data-part="group-label">
  {@render children?.()}
</div>
