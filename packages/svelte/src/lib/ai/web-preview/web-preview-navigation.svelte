<script lang="ts">
  interface WebPreviewNavigationProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: WebPreviewNavigationProps = $props()
</script>

<div {...rest} data-scope="web-preview" data-part="navigation">
  {@render children?.()}
</div>
