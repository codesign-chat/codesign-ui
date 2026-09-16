<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface PopoverTitleBaseProps extends PolymorphicProps<'h2'>, RefAttribute {}
  export interface PopoverTitleProps extends Assign<HTMLProps<'h2'>, PopoverTitleBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { usePopoverContext } from './use-popover-context.ts'

  let { ref = $bindable(null), ...props }: PopoverTitleProps = $props()

  const popover = usePopoverContext()
  const mergedProps = $derived(mergeProps(popover().getTitleProps(), props))
</script>

<Codesign as="h2" bind:ref {...mergedProps} />
