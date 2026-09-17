<script lang="ts">
  interface TestErrorStackProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: TestErrorStackProps = $props()
</script>

<pre {...rest} data-scope="test-results" data-part="error-stack">
  {@render children?.()}
</pre>
