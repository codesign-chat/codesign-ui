<script lang="ts">
  import { setContext } from 'svelte'
  import { envVarKey } from './environment-variables-context.svelte.ts'

  interface EnvironmentVariableProps {
    name: string
    value: string
    children?: import('svelte').Snippet
  }

  let { name, value, children, ...rest }: EnvironmentVariableProps = $props()

  setContext(envVarKey, { name, value })
</script>

<div {...rest} data-scope="env-vars" data-part="variable">
  {@render children?.()}
</div>
