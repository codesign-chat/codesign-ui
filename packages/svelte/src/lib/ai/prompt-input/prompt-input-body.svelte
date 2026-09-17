<script lang="ts">
  interface PromptInputBodyProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: PromptInputBodyProps = $props()
</script>

<div {...rest} data-scope="prompt-input" data-part="body">
  {@render children?.()}
</div>
