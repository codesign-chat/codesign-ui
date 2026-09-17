<script lang="ts">
  interface EnvironmentVariableRequiredProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: EnvironmentVariableRequiredProps = $props()
</script>

<span {...rest} data-scope="env-vars" data-part="required">
  {#if children}
      {@render children()}
    {:else}
      {'Required'}
    {/if}
</span>
