<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import { CollapsibleContent } from '../../components/collapsible/index.ts'

  interface ReasoningContentProps extends HTMLAttributes<HTMLDivElement> {
    children: import('svelte').Snippet
  }

  let { children, ...rest }: ReasoningContentProps = $props()
</script>

<CollapsibleContent {...rest} data-scope="reasoning" data-part="content">
  {@render children()}
</CollapsibleContent>
