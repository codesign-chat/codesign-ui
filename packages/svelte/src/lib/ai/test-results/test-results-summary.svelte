<script lang="ts">
  import { useTestResults } from './test-results-context.svelte.ts'

  interface TestResultsSummaryProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: TestResultsSummaryProps = $props()
  const { summary } = useTestResults()
</script>

{#if summary}
  <div {...rest} data-scope="test-results" data-part="summary">
    {#if children}
      {@render children()}
    {:else}
      <span data-scope="test-results" data-part="count" data-status="passed">{summary.passed} passed</span>
      {#if summary.failed > 0}
        <span data-scope="test-results" data-part="count" data-status="failed">{summary.failed} failed</span>
      {/if}
      {#if summary.skipped > 0}
        <span data-scope="test-results" data-part="count" data-status="skipped">{summary.skipped} skipped</span>
      {/if}
    {/if}
  </div>
{/if}
