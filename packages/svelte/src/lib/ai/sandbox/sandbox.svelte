<script lang="ts">
  import { CollapsibleRoot } from '../../components/collapsible/index.ts'

  interface SandboxProps {
    defaultOpen?: boolean
    children?: import('svelte').Snippet
  }

  let { defaultOpen = true, children, ...rest }: SandboxProps = $props()
</script>

<CollapsibleRoot {...rest} data-scope="sandbox" data-part="root" defaultOpen={defaultOpen}>
  {@render children?.()}
</CollapsibleRoot>
