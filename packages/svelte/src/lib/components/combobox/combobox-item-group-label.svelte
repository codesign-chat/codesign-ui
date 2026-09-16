<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ComboboxItemGroupLabelBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface ComboboxItemGroupLabelProps extends Assign<HTMLProps<'div'>, ComboboxItemGroupLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useComboboxContext } from './use-combobox-context.ts'
  import { useComboboxItemGroupPropsContext } from './use-combobox-item-group-props-context.ts'

  let { ref = $bindable(null), ...props }: ComboboxItemGroupLabelProps = $props()

  const combobox = useComboboxContext()
  const groupProps = useComboboxItemGroupPropsContext()

  const mergedProps = $derived(mergeProps(combobox().getItemGroupLabelProps({ htmlFor: groupProps().id }), props))
</script>

<Codesign as="div" bind:ref {...mergedProps} />
