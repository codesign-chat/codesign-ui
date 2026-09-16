<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface RadioGroupItemTextBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface RadioGroupItemTextProps extends Assign<HTMLProps<'span'>, RadioGroupItemTextBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useRadioGroupContext } from './use-radio-group-context.ts'
  import { useRadioGroupItemPropsContext } from './use-radio-group-item-props-context.ts'

  let { ref = $bindable(null), ...props }: RadioGroupItemTextProps = $props()

  const radioGroup = useRadioGroupContext()
  const itemProps = useRadioGroupItemPropsContext()

  const mergedProps = $derived(mergeProps(radioGroup().getItemTextProps(itemProps()), props))
</script>

<Codesign as="span" bind:ref {...mergedProps} />
