<script lang="ts">
  interface TestErrorProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: TestErrorProps = $props()
</script>

<div {...rest} data-scope="test-results" data-part="error">
  {@render children?.()}
</div>
