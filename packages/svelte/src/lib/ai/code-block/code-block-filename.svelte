<script lang="ts">
  interface CodeBlockFilenameProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: CodeBlockFilenameProps = $props()
</script>

<span {...rest} data-scope="code-block" data-part="filename">
  {@render children?.()}
</span>
