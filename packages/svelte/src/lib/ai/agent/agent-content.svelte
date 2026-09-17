<script lang="ts">
  interface AgentContentProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: AgentContentProps = $props()
</script>

<div {...rest} data-scope="agent" data-part="content">
  {@render children?.()}
</div>
