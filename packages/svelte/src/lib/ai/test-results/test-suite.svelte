<script lang="ts">
  import { setContext } from 'svelte'
  import { CollapsibleRoot } from '../../components/collapsible/index.ts'
  import { testSuiteKey, type TestStatus } from './test-results-context.svelte.ts'

  interface TestSuiteProps {
    name: string
    status: TestStatus
    children?: import('svelte').Snippet
  }

  let { name, status, children, ...rest }: TestSuiteProps = $props()

  setContext(testSuiteKey, { name, status })
</script>

<CollapsibleRoot {...rest} data-scope="test-results" data-part="suite" data-status={status}>
  {@render children?.()}
</CollapsibleRoot>
