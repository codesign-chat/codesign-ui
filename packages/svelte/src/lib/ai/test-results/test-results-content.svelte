<script lang="ts">
  interface TestResultsContentProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: TestResultsContentProps = $props()
</script>

<div {...rest} data-scope="test-results" data-part="content">
  {@render children?.()}
</div>
