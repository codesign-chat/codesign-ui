<script lang="ts">
  interface PromptInputFooterProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: PromptInputFooterProps = $props()
</script>

<div {...rest} data-scope="prompt-input" data-part="footer">
  {@render children?.()}
</div>
