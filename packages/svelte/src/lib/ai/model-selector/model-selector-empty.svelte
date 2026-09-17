<script lang="ts">
  import { useModelSelector } from './model-selector-context.svelte.ts'

  interface MSEmptyProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: MSEmptyProps = $props()
  const context = useModelSelector()
</script>

{#if context.visibleValues.length === 0}
  <div {...rest} data-scope="model-selector" data-part="empty">
    {#if children}
      {@render children()}
    {:else}
      No models found
    {/if}
  </div>
{/if}
