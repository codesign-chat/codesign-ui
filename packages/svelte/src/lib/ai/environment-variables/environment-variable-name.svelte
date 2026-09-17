<script lang="ts">
  import { useEnvironmentVariable } from './environment-variables-context.svelte.ts'

  interface EnvironmentVariableNameProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: EnvironmentVariableNameProps = $props()
  const { name } = useEnvironmentVariable()
</script>

<span {...rest} data-scope="env-vars" data-part="name">
  {#if children}
    {@render children()}
  {:else}
    {name}
  {/if}
</span>
