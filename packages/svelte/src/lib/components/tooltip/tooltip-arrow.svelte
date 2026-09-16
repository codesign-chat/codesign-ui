<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TooltipArrowBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface TooltipArrowProps extends Assign<HTMLProps<'div'>, TooltipArrowBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useTooltipContext } from './use-tooltip-context.ts'

  let { ref = $bindable(null), ...props }: TooltipArrowProps = $props()
  const tooltip = useTooltipContext()
  const mergedProps = $derived(mergeProps(tooltip().getArrowProps(), props))
</script>

<Codesign as="div" bind:ref {...mergedProps} />
