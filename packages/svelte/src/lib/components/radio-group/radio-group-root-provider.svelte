<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseRadioGroupReturn } from './use-radio-group.svelte.ts'

  interface RootProviderProps {
    value: UseRadioGroupReturn
  }

  export interface RadioGroupRootProviderBaseProps extends RootProviderProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface RadioGroupRootProviderProps extends Assign<HTMLProps<'div'>, RadioGroupRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { RadioGroupProvider } from './use-radio-group-context.ts'

  let { ref = $bindable(null), value, ...props }: RadioGroupRootProviderProps = $props()

  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  RadioGroupProvider(() => value())
</script>

<Codesign as="div" bind:ref {...mergedProps} />
