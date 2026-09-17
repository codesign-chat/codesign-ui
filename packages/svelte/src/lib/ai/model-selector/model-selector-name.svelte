<script lang="ts">
  interface MSNameProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: MSNameProps = $props()
</script>

<span {...rest} data-scope="model-selector" data-part="name">
  {@render children?.()}
</span>
