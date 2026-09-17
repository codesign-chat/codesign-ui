<script lang="ts">
  interface PromptInputHeaderProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: PromptInputHeaderProps = $props()
</script>

<div {...rest} data-scope="prompt-input" data-part="header">
  {@render children?.()}
</div>
