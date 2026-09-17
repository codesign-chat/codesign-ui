<script lang="ts">
  import { CollapsibleContent } from '../../components/collapsible/index.ts'

  interface SourcesContentProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: SourcesContentProps = $props()
</script>

<CollapsibleContent {...rest} data-scope="sources" data-part="content">
  {@render children?.()}
</CollapsibleContent>
