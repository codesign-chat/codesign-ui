<script lang="ts">
  interface SchemaDisplayContentProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: SchemaDisplayContentProps = $props()
</script>

<div {...rest} data-scope="schema-display" data-part="content">
  {@render children?.()}
</div>
