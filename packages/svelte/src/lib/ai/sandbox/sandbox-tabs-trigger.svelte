<script lang="ts">
  import { TabTrigger } from '../../components/tabs/index.ts'

  interface SandboxTabTriggerProps {
    value: string
    children?: import('svelte').Snippet
  }

  let { value, children, ...rest }: SandboxTabTriggerProps = $props()
</script>

<TabTrigger {...rest} data-scope="sandbox" data-part="tabs-trigger" value={value}>
  {@render children?.()}
</TabTrigger>
