<script lang="ts">
  import { CollapsibleContent } from '../../components/collapsible/index.ts'

  interface ToolContentProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: ToolContentProps = $props()
</script>

<CollapsibleContent {...rest} data-scope="tool" data-part="content">
  {@render children?.()}
</CollapsibleContent>
