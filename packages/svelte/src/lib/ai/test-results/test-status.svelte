<script lang="ts">
  import { useTest } from './test-results-context.svelte.ts'

  interface TestStatusProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: TestStatusProps = $props()
  const { status } = useTest()
</script>

<span {...rest} data-scope="test-results" data-part="test-status" data-status={status}>
  {#if children}
      {@render children()}
    {:else}
      {status}
    {/if}
</span>
