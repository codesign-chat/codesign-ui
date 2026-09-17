<script lang="ts">
  interface WebPreviewNavigationButtonProps {
    tooltip?: string
    children?: import('svelte').Snippet
  }

  let { tooltip, children, ...rest }: WebPreviewNavigationButtonProps = $props()
</script>

<button {...rest} data-scope="web-preview" data-part="navigation-button" title={tooltip} type="button">
  {@render children?.()}
</button>
