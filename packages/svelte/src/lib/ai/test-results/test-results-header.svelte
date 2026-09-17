<script lang="ts">
  interface TestResultsHeaderProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: TestResultsHeaderProps = $props()
</script>

<div {...rest} data-scope="test-results" data-part="header">
  {@render children?.()}
</div>
