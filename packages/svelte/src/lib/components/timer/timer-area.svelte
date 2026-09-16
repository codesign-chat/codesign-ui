<script lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useTimerContext } from './use-timer-context.ts'

  export interface TimerAreaBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface TimerAreaProps extends HTMLProps<'div'>, TimerAreaBaseProps {}

  let { ref = $bindable(null), ...props }: TimerAreaProps = $props()
  const timer = useTimerContext()
  const mergedProps = $derived(mergeProps(timer().getAreaProps(), props))
</script>

<Codesign as="div" bind:ref {...mergedProps} />
