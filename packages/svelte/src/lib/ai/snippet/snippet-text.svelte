<script lang="ts">
  interface SnippetTextProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: SnippetTextProps = $props()
</script>

<span {...rest} data-scope="snippet" data-part="text">
  {@render children?.()}
</span>
