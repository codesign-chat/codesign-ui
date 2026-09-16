<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SliderLabelBaseProps extends PolymorphicProps<'label'>, RefAttribute {}
  export interface SliderLabelProps extends HTMLProps<'label'>, SliderLabelBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useSliderContext } from './use-slider-context.ts'

  let { ref = $bindable(null), ...props }: SliderLabelProps = $props()
  const slider = useSliderContext()
  const mergedProps = $derived(mergeProps(slider().getLabelProps(), props))
</script>

<Codesign as="label" bind:ref {...mergedProps} />
