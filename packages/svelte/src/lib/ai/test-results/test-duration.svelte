<script lang="ts">
  import { useTest } from './test-results-context.svelte.ts'

  interface TestDurationProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: TestDurationProps = $props()
  const { duration } = useTest()
</script>

{#if duration !== undefined}
  <span {...rest} data-scope="test-results" data-part="test-duration">
    {#if children}
      {@render children()}
    {:else}
      {duration}ms
    {/if}
  </span>
{/if}
