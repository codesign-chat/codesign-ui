<script lang="ts">
  import { CollapsibleRoot } from '../../components/collapsible/index.ts'

  interface TaskProps {
    defaultOpen?: boolean
    children?: import('svelte').Snippet
  }

  let { defaultOpen = true, children, ...rest }: TaskProps = $props()
</script>

<CollapsibleRoot {...rest} data-scope="task" data-part="root" defaultOpen={defaultOpen}>
  {@render children?.()}
</CollapsibleRoot>
