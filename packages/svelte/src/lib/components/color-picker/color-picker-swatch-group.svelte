<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ColorPickerSwatchGroupBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface ColorPickerSwatchGroupProps extends Assign<HTMLProps<'div'>, ColorPickerSwatchGroupBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useColorPickerContext } from './use-color-picker-context.ts'

  let { ref = $bindable(null), ...props }: ColorPickerSwatchGroupProps = $props()

  const colorPicker = useColorPickerContext()
  const mergedProps = $derived(mergeProps(colorPicker().getSwatchGroupProps(), props))
</script>

<Codesign as="div" bind:ref {...mergedProps} />
