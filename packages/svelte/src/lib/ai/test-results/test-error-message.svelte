<script lang="ts">
  interface TestErrorMessageProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: TestErrorMessageProps = $props()
</script>

<p {...rest} data-scope="test-results" data-part="error-message">
  {@render children?.()}
</p>
