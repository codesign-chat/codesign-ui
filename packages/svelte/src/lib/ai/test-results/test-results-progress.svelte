<script lang="ts">
  import { useTestResults } from './test-results-context.svelte.ts'

  interface TestResultsProgressProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: TestResultsProgressProps = $props()
  const { summary } = useTestResults()

  const passedPercent = $derived(summary ? (summary.passed / summary.total) * 100 : 0)
  const failedPercent = $derived(summary ? (summary.failed / summary.total) * 100 : 0)
</script>

{#if summary}
  <div {...rest} data-scope="test-results" data-part="progress">
    {#if children}
      {@render children()}
    {:else}
      <div data-scope="test-results" data-part="progress-track">
        <div data-scope="test-results" data-part="progress-fill" data-status="passed" style:width="{passedPercent}%"></div>
        <div data-scope="test-results" data-part="progress-fill" data-status="failed" style:width="{failedPercent}%"></div>
      </div>
      <div data-scope="test-results" data-part="progress-meta">
        <span>{summary.passed}/{summary.total} tests passed</span>
        <span>{passedPercent.toFixed(0)}%</span>
      </div>
    {/if}
  </div>
{/if}
