<script lang="ts">
  interface AgentHeaderProps {
    model?: import('svelte').Snippet
    name: string
    children?: import('svelte').Snippet
  }

  let { model, name, children, ...rest }: AgentHeaderProps = $props()
</script>

<div {...rest} data-scope="agent" data-part="header">
  <div data-scope="agent" data-part="header-identity">
    {#if children}
      {@render children()}
    {:else}
      <span data-scope="agent" data-part="name">{name}</span>
      {#if model}
        <span data-scope="agent" data-part="model">{@render model()}</span>
      {/if}
    {/if}
  </div>
</div>
