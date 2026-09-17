<script lang="ts">
  import { formatDuration, useTestResults } from './test-results-context.svelte.ts'

  interface TestResultsDurationProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: TestResultsDurationProps = $props()
  const { summary } = useTestResults()
</script>

{#if summary?.duration}
  <span {...rest} data-scope="test-results" data-part="duration">
    {#if children}
      {@render children()}
    {:else}
      {formatDuration(summary.duration)}
    {/if}
  </span>
{/if}
