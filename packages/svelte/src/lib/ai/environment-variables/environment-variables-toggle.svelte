<script lang="ts">
  import { SwitchRoot } from '../../components/switch/index.ts'
  import { useEnvironmentVariables } from './environment-variables-context.svelte.ts'

  interface EnvironmentVariablesToggleProps {
    toggleIcon?: import('svelte').Snippet
    children?: import('svelte').Snippet
  }

  let { toggleIcon, children, ...rest }: EnvironmentVariablesToggleProps = $props()
  const context = useEnvironmentVariables()
</script>

<div {...rest} data-scope="env-vars" data-part="toggle">
  <span data-scope="env-vars" data-part="toggle-icon">
    {#if context.showValues}
      {@render toggleIcon?.()}
    {/if}
  </span>
  <SwitchRoot aria-label="Toggle value visibility" checked={context.showValues} onCheckedChange={(details) => context.setShowValues(details.checked)} />
  {@render children?.()}
</div>
