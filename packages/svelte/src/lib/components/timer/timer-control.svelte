<script lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useTimerContext } from './use-timer-context.ts'

  export interface TimerControlBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface TimerControlProps extends HTMLProps<'div'>, TimerControlBaseProps {}

  let { ref = $bindable(null), ...props }: TimerControlProps = $props()
  const timer = useTimerContext()
  const mergedProps = $derived(mergeProps(timer().getControlProps(), props))
</script>

<Codesign as="div" bind:ref {...mergedProps} />
