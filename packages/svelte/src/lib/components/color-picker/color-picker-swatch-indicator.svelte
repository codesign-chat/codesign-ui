<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ColorPickerSwatchIndicatorBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface ColorPickerSwatchIndicatorProps extends Assign<
    HTMLProps<'div'>,
    ColorPickerSwatchIndicatorBaseProps
  > {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useColorPickerContext } from './use-color-picker-context.ts'
  import { useColorPickerSwatchPropsContext } from './use-color-picker-swatch-props-context.ts'

  let { ref = $bindable(null), ...props }: ColorPickerSwatchIndicatorProps = $props()

  const colorPicker = useColorPickerContext()
  const swatchProps = useColorPickerSwatchPropsContext()
  const mergedProps = $derived(mergeProps(colorPicker().getSwatchIndicatorProps(swatchProps()), props))
</script>

<Codesign as="div" bind:ref {...mergedProps} />
