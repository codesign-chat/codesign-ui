<script lang="ts">
  import { CollapsibleContent, CollapsibleRoot } from '../../components/collapsible/index.ts'
  import { useStackTrace } from './stack-trace-context.svelte.ts'

  interface StackTraceContentProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: StackTraceContentProps = $props()
  const { isOpen } = useStackTrace()
</script>

<CollapsibleRoot data-scope="stack-trace" data-part="content-collapsible" open={isOpen}>
  <CollapsibleContent {...rest} data-scope="stack-trace" data-part="content">
    {@render children?.()}
  </CollapsibleContent>
</CollapsibleRoot>
