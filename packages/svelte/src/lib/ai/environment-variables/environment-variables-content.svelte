<script lang="ts">
  interface EnvironmentVariablesContentProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: EnvironmentVariablesContentProps = $props()
</script>

<div {...rest} data-scope="env-vars" data-part="content">
  {@render children?.()}
</div>
