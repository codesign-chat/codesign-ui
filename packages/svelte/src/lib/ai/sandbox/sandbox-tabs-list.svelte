<script lang="ts">
  import { TabList } from '../../components/tabs/index.ts'

  interface SandboxTabListProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: SandboxTabListProps = $props()
</script>

<TabList {...rest} data-scope="sandbox" data-part="tabs-list">
  {@render children?.()}
</TabList>
