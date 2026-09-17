<script lang="ts">
  interface SnippetAddonProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: SnippetAddonProps = $props()
</script>

<div {...rest} data-scope="snippet" data-part="addon">
  {@render children?.()}
</div>
