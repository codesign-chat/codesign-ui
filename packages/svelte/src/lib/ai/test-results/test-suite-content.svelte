<script lang="ts">
  import { CollapsibleContent } from '../../components/collapsible/index.ts'

  interface TestSuiteContentProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: TestSuiteContentProps = $props()
</script>

<CollapsibleContent {...rest} data-scope="test-results" data-part="suite-content">
  <div data-scope="test-results" data-part="suite-list">
    {@render children?.()}
  </div>
</CollapsibleContent>
