<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'

  export interface ScrollAreaContentBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface ScrollAreaContentProps extends Assign<HTMLProps<'div'>, ScrollAreaContentBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.js'
  import { useScrollAreaContext } from './use-scroll-area-context.js'

  let { ref = $bindable(null), ...props }: ScrollAreaContentProps = $props()

  const scrollArea = useScrollAreaContext()
  const mergedProps = $derived(mergeProps(scrollArea().getContentProps(), props))
</script>

<Codesign as="div" bind:ref {...mergedProps} />
