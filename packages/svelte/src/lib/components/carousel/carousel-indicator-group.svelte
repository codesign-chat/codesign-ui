<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface CarouselIndicatorGroupBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface CarouselIndicatorGroupProps extends Assign<HTMLProps<'div'>, CarouselIndicatorGroupBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useCarouselContext } from './use-carousel-context.ts'

  let { ref = $bindable(null), ...props }: CarouselIndicatorGroupProps = $props()

  const carousel = useCarouselContext()
  const mergedProps = $derived(mergeProps(carousel().getIndicatorGroupProps(), props))
</script>

<Codesign as="div" bind:ref {...mergedProps} />
