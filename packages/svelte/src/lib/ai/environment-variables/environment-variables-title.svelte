<script lang="ts">
  interface EnvironmentVariablesTitleProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: EnvironmentVariablesTitleProps = $props()
</script>

<h3 {...rest} data-scope="env-vars" data-part="title">
  {#if children}
      {@render children()}
    {:else}
      {'Environment Variables'}
    {/if}
</h3>
