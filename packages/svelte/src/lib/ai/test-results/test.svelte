<script lang="ts">
  import { setContext } from 'svelte'
  import { testKey, type TestStatus } from './test-results-context.svelte.ts'

  interface TestProps {
    duration?: number
    name: string
    status: TestStatus
    children?: import('svelte').Snippet
  }

  let { duration, name, status, children, ...rest }: TestProps = $props()

  setContext(testKey, { duration, name, status })
</script>

<div {...rest} data-scope="test-results" data-part="test">
  {@render children?.()}
</div>
