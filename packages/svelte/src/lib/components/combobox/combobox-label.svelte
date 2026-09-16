<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ComboboxLabelBaseProps extends PolymorphicProps<'label'>, RefAttribute {}
  export interface ComboboxLabelProps extends Assign<HTMLProps<'label'>, ComboboxLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useComboboxContext } from './use-combobox-context.ts'

  let { ref = $bindable(null), ...props }: ComboboxLabelProps = $props()

  const combobox = useComboboxContext()
  const mergedProps = $derived(mergeProps(combobox().getLabelProps(), props))
</script>

<Codesign as="label" bind:ref {...mergedProps} />
