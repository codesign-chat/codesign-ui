<script lang="ts">
  import { setContext } from 'svelte'
  import { envVarsKey } from './environment-variables-context.svelte.ts'

  interface EnvironmentVariablesProps {
    defaultShowValues?: boolean
    onShowValuesChange?: (show: boolean) => void
    showValues?: boolean
    children?: import('svelte').Snippet
  }

  let { defaultShowValues = false, onShowValuesChange, showValues: controlled, children, ...rest }: EnvironmentVariablesProps = $props()

  let internal = $state(defaultShowValues)

  setContext(envVarsKey, {
    get showValues() {
      return controlled ?? internal
    },
    setShowValues(show: boolean) {
      internal = show
      onShowValuesChange?.(show)
    },
  })
</script>

<div {...rest} data-scope="env-vars" data-part="root">
  {@render children?.()}
</div>
