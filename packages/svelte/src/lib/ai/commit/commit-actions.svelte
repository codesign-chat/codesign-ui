<script lang="ts">
  interface CommitActionsProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: CommitActionsProps = $props()

  const swallow = (event: Event) => event.stopPropagation()
</script>

<div {...rest} data-scope="commit" data-part="actions" onclick={swallow} onkeydown={swallow} role="group">
  {@render children?.()}
</div>
