<script lang="ts">
  interface EnvironmentVariablesHeaderProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: EnvironmentVariablesHeaderProps = $props()
</script>

<div {...rest} data-scope="env-vars" data-part="header">
  {@render children?.()}
</div>
