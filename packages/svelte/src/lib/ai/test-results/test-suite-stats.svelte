<script lang="ts">
  interface TestSuiteStatsProps {
    failed?: number
    passed?: number
    skipped?: number
    children?: import('svelte').Snippet
  }

  let { failed = 0, passed = 0, skipped = 0, children, ...rest }: TestSuiteStatsProps = $props()
</script>

<div {...rest} data-scope="test-results" data-part="suite-stats">
  {#if children}
    {@render children()}
  {:else}
    {#if passed > 0}
      <span data-scope="test-results" data-part="stat" data-status="passed">{passed} passed</span>
    {/if}
    {#if failed > 0}
      <span data-scope="test-results" data-part="stat" data-status="failed">{failed} failed</span>
    {/if}
    {#if skipped > 0}
      <span data-scope="test-results" data-part="stat" data-status="skipped">{skipped} skipped</span>
    {/if}
  {/if}
</div>
