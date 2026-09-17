<script lang="ts">
  import { CollapsibleRoot } from '../../components/collapsible/index.ts'

  interface ToolProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: ToolProps = $props()
</script>

<CollapsibleRoot {...rest} data-scope="tool" data-part="root">
  {@render children?.()}
</CollapsibleRoot>
