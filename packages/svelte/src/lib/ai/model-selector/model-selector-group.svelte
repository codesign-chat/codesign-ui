<script lang="ts">
  interface MSGroupProps {
    label: string
    children?: import('svelte').Snippet
  }

  let { label, children, ...rest }: MSGroupProps = $props()
</script>

<div {...rest} aria-label={label} data-scope="model-selector" data-part="group" role="group">
  {@render children?.()}
</div>
