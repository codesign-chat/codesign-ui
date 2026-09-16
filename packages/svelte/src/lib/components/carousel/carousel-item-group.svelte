<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface CarouselItemGroupBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface CarouselItemGroupProps extends Assign<HTMLProps<'div'>, CarouselItemGroupBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useCarouselContext } from './use-carousel-context.ts'

  let { ref = $bindable(null), ...props }: CarouselItemGroupProps = $props()

  const carousel = useCarouselContext()
  const mergedProps = $derived(mergeProps(carousel().getItemGroupProps(), props))
</script>

<Codesign as="div" bind:ref {...mergedProps} />
