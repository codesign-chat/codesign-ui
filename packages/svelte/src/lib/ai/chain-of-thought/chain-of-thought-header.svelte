<script lang="ts">
  import { CollapsibleRoot, CollapsibleTrigger } from '../../components/collapsible/index.ts'
  import { useChainOfThought } from './chain-of-thought-context.svelte.ts'

  interface ChainOfThoughtHeaderProps {
    indicator?: import('svelte').Snippet
    children?: import('svelte').Snippet
  }

  let { indicator, children, ...rest }: ChainOfThoughtHeaderProps = $props()
  const { isOpen, setIsOpen } = useChainOfThought()
</script>

<CollapsibleRoot data-scope="chain-of-thought" data-part="header" open={isOpen} onOpenChange={(details) => setIsOpen(details.open)}>
  <CollapsibleTrigger {...rest} data-scope="chain-of-thought" data-part="trigger">
    {#if children}
      {@render children()}
    {:else}
      Chain of Thought
    {/if}
    {@render indicator?.()}
  </CollapsibleTrigger>
</CollapsibleRoot>
