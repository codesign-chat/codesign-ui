<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ComboboxControlBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface ComboboxControlProps extends Assign<HTMLProps<'div'>, ComboboxControlBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useComboboxContext } from './use-combobox-context.ts'

  let { ref = $bindable(null), ...props }: ComboboxControlProps = $props()

  const combobox = useComboboxContext()
  const mergedProps = $derived(mergeProps(combobox().getControlProps(), props))
</script>

<Codesign as="div" bind:ref {...mergedProps} />
