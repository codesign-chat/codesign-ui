<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ColorPickerFormatTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface ColorPickerFormatTriggerProps extends Assign<
    HTMLProps<'button'>,
    ColorPickerFormatTriggerBaseProps
  > {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useColorPickerContext } from './use-color-picker-context.ts'

  let { ref = $bindable(null), ...props }: ColorPickerFormatTriggerProps = $props()

  const colorPicker = useColorPickerContext()
  const mergedProps = $derived(mergeProps(colorPicker().getFormatTriggerProps(), props))
</script>

<Codesign as="button" bind:ref {...mergedProps} />
