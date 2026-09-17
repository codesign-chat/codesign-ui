<script lang="ts">
  interface CodeBlockActionsProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: CodeBlockActionsProps = $props()
</script>

<div {...rest} data-scope="code-block" data-part="actions">
  {@render children?.()}
</div>
