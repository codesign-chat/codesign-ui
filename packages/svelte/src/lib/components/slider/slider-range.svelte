<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SliderRangeBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface SliderRangeProps extends HTMLProps<'div'>, SliderRangeBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useSliderContext } from './use-slider-context.ts'

  let { ref = $bindable(null), ...props }: SliderRangeProps = $props()
  const slider = useSliderContext()
  const mergedProps = $derived(mergeProps(slider().getRangeProps(), props))
</script>

<Codesign as="div" bind:ref {...mergedProps} />
