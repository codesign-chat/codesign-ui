<script lang="ts">
  interface EnvironmentVariableGroupProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: EnvironmentVariableGroupProps = $props()
</script>

<div {...rest} data-scope="env-vars" data-part="group">
  {@render children?.()}
</div>
