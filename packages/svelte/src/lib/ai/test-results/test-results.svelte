<script lang="ts">
  import { setContext } from 'svelte'
  import { testResultsKey, type TestResultsSummary } from './test-results-context.svelte.ts'

  interface TestResultsProps {
    summary?: TestResultsSummary
    children?: import('svelte').Snippet
  }

  let { summary, children, ...rest }: TestResultsProps = $props()

  setContext(testResultsKey, { summary })
</script>

<div {...rest} data-scope="test-results" data-part="root">
  {@render children?.()}
</div>
