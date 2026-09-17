<script lang="ts">
  import { CollapsibleTrigger } from '../../components/collapsible/index.ts'
  import Shimmer from '../shimmer/shimmer.svelte'
  import { useReasoning } from './reasoning-context.svelte.ts'

  interface ReasoningTriggerProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: ReasoningTriggerProps = $props()

  const context = useReasoning()
</script>

{#snippet defaultMessage()}
  {#if context.isStreaming || context.duration === 0}
    <Shimmer text="Thinking..." />
  {:else if context.duration === undefined}
    <p>Thought for a few seconds</p>
  {:else}
    <p>Thought for {context.duration} seconds</p>
  {/if}
{/snippet}

<CollapsibleTrigger {...rest} data-scope="reasoning" data-part="trigger">
  {#if children}
    {@render children()}
  {:else}
    {@render defaultMessage()}
  {/if}
</CollapsibleTrigger>
