<script lang="ts" module>
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface AngleSliderValueTextBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface AngleSliderValueTextProps extends HTMLProps<'div'>, AngleSliderValueTextBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useAngleSliderContext } from './use-angle-slider-context.ts'

  let { ref = $bindable(null), ...props }: AngleSliderValueTextProps = $props()
  const angleSlider = useAngleSliderContext()
  const mergedProps = $derived(mergeProps(angleSlider().getValueTextProps(), props))
</script>

<Codesign as="span" bind:ref {...mergedProps} />
