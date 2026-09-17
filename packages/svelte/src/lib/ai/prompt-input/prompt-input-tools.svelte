<script lang="ts">
  interface PromptInputToolsProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: PromptInputToolsProps = $props()
</script>

<div {...rest} data-scope="prompt-input" data-part="tools">
  {@render children?.()}
</div>
