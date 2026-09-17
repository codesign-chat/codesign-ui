<script lang="ts">
  import { useEnvironmentVariable, useEnvironmentVariables } from './environment-variables-context.svelte.ts'

  interface EnvironmentVariableValueProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: EnvironmentVariableValueProps = $props()
  const { value } = useEnvironmentVariable()
  const { showValues } = useEnvironmentVariables()

  const display = $derived(showValues ? value : '•'.repeat(Math.min(value.length, 20)))
</script>

<span {...rest} data-hidden={!showValues || undefined} data-scope="env-vars" data-part="value">
  {#if children}
    {@render children()}
  {:else}
    {display}
  {/if}
</span>
