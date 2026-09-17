<script lang="ts">
  import { useTest } from './test-results-context.svelte.ts'

  interface TestNameProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: TestNameProps = $props()
  const { name } = useTest()
</script>

<span {...rest} data-scope="test-results" data-part="name">
  {#if children}
      {@render children()}
    {:else}
      {name}
    {/if}
</span>
