<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface HoverCardArrowTipBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface HoverCardArrowTipProps extends Assign<HTMLProps<'div'>, HoverCardArrowTipBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useHoverCardContext } from './use-hover-card-context.ts'

  let { ref = $bindable(null), ...props }: HoverCardArrowTipProps = $props()

  const hoverCard = useHoverCardContext()
  const mergedProps = $derived(mergeProps(hoverCard().getArrowTipProps(), props))
</script>

<Codesign as="div" bind:ref {...mergedProps} />
