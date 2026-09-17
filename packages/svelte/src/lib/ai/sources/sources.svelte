<script lang="ts">
  import { CollapsibleRoot } from '../../components/collapsible/index.ts'

  interface SourcesProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: SourcesProps = $props()
</script>

<CollapsibleRoot {...rest} data-scope="sources" data-part="root">
  {@render children?.()}
</CollapsibleRoot>
