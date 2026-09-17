<script lang="ts">
  interface MSShortcutProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: MSShortcutProps = $props()
</script>

<span {...rest} data-scope="model-selector" data-part="shortcut">
  {@render children?.()}
</span>
