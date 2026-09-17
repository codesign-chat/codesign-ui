<script lang="ts">
  interface SchemaDisplayExampleProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: SchemaDisplayExampleProps = $props()
</script>

<pre {...rest} data-scope="schema-display" data-part="example">
  {@render children?.()}
</pre>
