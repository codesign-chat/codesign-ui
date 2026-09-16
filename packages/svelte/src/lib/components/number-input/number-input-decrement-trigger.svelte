<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface NumberInputDecrementTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface NumberInputDecrementTriggerProps extends Assign<
    HTMLProps<'button'>,
    NumberInputDecrementTriggerBaseProps
  > {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useNumberInputContext } from './use-number-input-context.ts'

  let { ref = $bindable(null), ...props }: NumberInputDecrementTriggerProps = $props()

  const numberInput = useNumberInputContext()
  const mergedProps = $derived(mergeProps(numberInput().getDecrementTriggerProps(), props))
</script>

<Codesign as="button" bind:ref {...mergedProps} />
