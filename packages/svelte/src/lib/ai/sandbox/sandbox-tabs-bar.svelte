<script lang="ts">
  interface SandboxTabsBarProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: SandboxTabsBarProps = $props()
</script>

<div {...rest} data-scope="sandbox" data-part="tabs-bar">
  {@render children?.()}
</div>
