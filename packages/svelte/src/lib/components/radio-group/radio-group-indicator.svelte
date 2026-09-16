<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface RadioGroupIndicatorBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface RadioGroupIndicatorProps extends Assign<HTMLProps<'div'>, RadioGroupIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useRadioGroupContext } from './use-radio-group-context.ts'

  let { ref = $bindable(null), ...props }: RadioGroupIndicatorProps = $props()

  const radioGroup = useRadioGroupContext()
  const mergedProps = $derived(mergeProps(radioGroup().getIndicatorProps(), props))
</script>

<Codesign as="div" bind:ref {...mergedProps} />
