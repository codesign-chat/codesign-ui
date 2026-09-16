<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'

  export interface ScrollAreaViewportBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface ScrollAreaViewportProps extends Assign<HTMLProps<'div'>, ScrollAreaViewportBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.js'
  import { useScrollAreaContext } from './use-scroll-area-context.js'

  let { ref = $bindable(null), ...props }: ScrollAreaViewportProps = $props()

  const scrollArea = useScrollAreaContext()
  const mergedProps = $derived(mergeProps(scrollArea().getViewportProps(), props))
</script>

<Codesign as="div" bind:ref {...mergedProps} />
