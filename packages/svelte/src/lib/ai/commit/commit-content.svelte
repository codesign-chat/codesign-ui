<script lang="ts">
  import { CollapsibleContent } from '../../components/collapsible/index.ts'

  interface CommitContentProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: CommitContentProps = $props()
</script>

<CollapsibleContent {...rest} data-scope="commit" data-part="content">
  {@render children?.()}
</CollapsibleContent>
