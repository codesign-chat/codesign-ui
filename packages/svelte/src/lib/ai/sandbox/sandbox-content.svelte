<script lang="ts">
  import { CollapsibleContent } from '../../components/collapsible/index.ts'

  interface SandboxContentProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: SandboxContentProps = $props()
</script>

<CollapsibleContent {...rest} data-scope="sandbox" data-part="content">
  {@render children?.()}
</CollapsibleContent>
