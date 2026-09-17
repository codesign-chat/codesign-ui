<script lang="ts">
  interface MSLogoGroupProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: MSLogoGroupProps = $props()
</script>

<div {...rest} data-scope="model-selector" data-part="logo-group">
  {@render children?.()}
</div>
