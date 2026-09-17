<script lang="ts">
  interface MSSeparatorProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: MSSeparatorProps = $props()
</script>

<div {...rest} data-scope="model-selector" data-part="separator">
  {@render children?.()}
</div>
