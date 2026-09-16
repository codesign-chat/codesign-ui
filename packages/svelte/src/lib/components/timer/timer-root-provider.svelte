<script lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { TimerProvider } from './use-timer-context.ts'
  import type { UseTimerReturn } from './use-timer.svelte.ts'

  interface RootProviderProps {
    value: UseTimerReturn
  }

  export interface TimerRootProviderBaseProps extends RootProviderProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface TimerRootProviderProps extends HTMLProps<'div'>, TimerRootProviderBaseProps {}

  let { ref = $bindable(null), value, ...props }: TimerRootProviderProps = $props()
  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  TimerProvider(() => value())
</script>

<Codesign as="div" bind:ref {...mergedProps} />
