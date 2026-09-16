<script lang="ts" module>
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface AngleSliderHiddenInputBaseProps extends PolymorphicProps<'input'>, RefAttribute {}
  export interface AngleSliderHiddenInputProps extends HTMLProps<'input'>, AngleSliderHiddenInputBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useAngleSliderContext } from './use-angle-slider-context.ts'

  let { ref = $bindable(null), ...props }: AngleSliderHiddenInputProps = $props()
  const angleSlider = useAngleSliderContext()
  const mergedProps = $derived(mergeProps(angleSlider().getHiddenInputProps(), props))
</script>

<Codesign as="input" bind:ref {...mergedProps} />
