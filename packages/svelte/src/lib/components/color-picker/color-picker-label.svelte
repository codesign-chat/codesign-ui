<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ColorPickerLabelBaseProps extends PolymorphicProps<'label'>, RefAttribute {}
  export interface ColorPickerLabelProps extends Assign<HTMLProps<'label'>, ColorPickerLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useColorPickerContext } from './use-color-picker-context.ts'

  let { ref = $bindable(null), ...props }: ColorPickerLabelProps = $props()

  const colorPicker = useColorPickerContext()
  const mergedProps = $derived(mergeProps(colorPicker().getLabelProps(), props))
</script>

<Codesign as="label" bind:ref {...mergedProps} />
