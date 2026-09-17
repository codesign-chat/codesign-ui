<script lang="ts">
  interface SchemaDisplayHeaderProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: SchemaDisplayHeaderProps = $props()
</script>

<div {...rest} data-scope="schema-display" data-part="header">
  {@render children?.()}
</div>
