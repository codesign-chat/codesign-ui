<script lang="ts">
  import { CollapsibleRoot, CollapsibleContent } from '../../components/collapsible/index.ts'
  import { useChainOfThought } from './chain-of-thought-context.svelte.ts'

  interface ChainOfThoughtContentProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: ChainOfThoughtContentProps = $props()
  const { isOpen } = useChainOfThought()
</script>

<CollapsibleRoot data-scope="chain-of-thought" data-part="content-collapsible" open={isOpen}>
  <CollapsibleContent {...rest} data-scope="chain-of-thought" data-part="content">
    {@render children?.()}
  </CollapsibleContent>
</CollapsibleRoot>
