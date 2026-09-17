<script lang="ts">
  import { CollapsibleContent } from '../../components/collapsible/index.ts'

  interface TaskContentProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: TaskContentProps = $props()
</script>

<CollapsibleContent {...rest} data-scope="task" data-part="content">
  <div data-scope="task" data-part="task-list">
    {@render children?.()}
  </div>
</CollapsibleContent>
