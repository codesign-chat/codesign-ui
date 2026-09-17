<script lang="ts">
  interface InlineCitationQuoteProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: InlineCitationQuoteProps = $props()
</script>

<blockquote {...rest} data-scope="inline-citation" data-part="quote">
  {@render children?.()}
</blockquote>
