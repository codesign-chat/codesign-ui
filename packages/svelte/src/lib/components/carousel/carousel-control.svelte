<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface CarouselControlBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface CarouselControlProps extends Assign<HTMLProps<'div'>, CarouselControlBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useCarouselContext } from './use-carousel-context.ts'

  let { ref = $bindable(null), ...props }: CarouselControlProps = $props()

  const carousel = useCarouselContext()
  const mergedProps = $derived(mergeProps(carousel().getControlProps(), props))
</script>

<Codesign as="div" bind:ref {...mergedProps} />
