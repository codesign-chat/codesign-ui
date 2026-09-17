<script lang="ts">
  interface AgentProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: AgentProps = $props()
</script>

<div {...rest} data-scope="agent" data-part="root">
  {@render children?.()}
</div>
