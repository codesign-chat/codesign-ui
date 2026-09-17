<script lang="ts">
  interface CodeBlockTitleProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: CodeBlockTitleProps = $props()
</script>

<div {...rest} data-scope="code-block" data-part="title">
  {@render children?.()}
</div>
