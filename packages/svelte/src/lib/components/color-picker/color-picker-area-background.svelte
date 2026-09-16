<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ColorPickerAreaBackgroundBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface ColorPickerAreaBackgroundProps extends Assign<
    HTMLProps<'div'>,
    ColorPickerAreaBackgroundBaseProps
  > {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useColorPickerContext } from './use-color-picker-context.ts'
  import { useColorPickerAreaPropsContext } from './use-color-picker-area-props-context.ts'

  let { ref = $bindable(null), ...props }: ColorPickerAreaBackgroundProps = $props()

  const colorPicker = useColorPickerContext()
  const areaProps = useColorPickerAreaPropsContext()

  const mergedProps = $derived(mergeProps(colorPicker().getAreaBackgroundProps(areaProps()), props))
</script>

<Codesign as="div" bind:ref {...mergedProps} />
