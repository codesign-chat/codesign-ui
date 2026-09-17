<script lang="ts">
  import { TabContent } from '../../components/tabs/index.ts'

  interface SandboxTabContentProps {
    value: string
    children?: import('svelte').Snippet
  }

  let { value, children, ...rest }: SandboxTabContentProps = $props()
</script>

<TabContent {...rest} data-scope="sandbox" data-part="tab-content" value={value}>
  {@render children?.()}
</TabContent>
