<script lang="ts">
  interface CodeBlockHeaderProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: CodeBlockHeaderProps = $props()
</script>

<div {...rest} data-scope="code-block" data-part="header">
  {@render children?.()}
</div>
