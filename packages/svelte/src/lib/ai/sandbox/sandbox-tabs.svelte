<script lang="ts">
  import { TabsRoot } from '../../components/tabs/index.ts'

  interface SandboxTabsProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: SandboxTabsProps = $props()
</script>

<TabsRoot {...rest} data-scope="sandbox" data-part="tabs">
  {@render children?.()}
</TabsRoot>
