<script lang="ts">
  import { CollapsibleTrigger } from '../../components/collapsible/index.ts'
  import { useTestSuite } from './test-results-context.svelte.ts'

  interface TestSuiteNameProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: TestSuiteNameProps = $props()
  const { name, status } = useTestSuite()
</script>

<CollapsibleTrigger {...rest} data-scope="test-results" data-part="suite-trigger" data-status={status}>
  {#if children}
      {@render children()}
    {:else}
      {name}
    {/if}
</CollapsibleTrigger>
