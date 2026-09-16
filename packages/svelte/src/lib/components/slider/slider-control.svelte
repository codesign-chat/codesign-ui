<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SliderControlBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface SliderControlProps extends HTMLProps<'div'>, SliderControlBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useSliderContext } from './use-slider-context.ts'

  let { ref = $bindable(null), ...props }: SliderControlProps = $props()
  const slider = useSliderContext()
  const mergedProps = $derived(mergeProps(slider().getControlProps(), props))
</script>

<Codesign as="div" bind:ref {...mergedProps} />
