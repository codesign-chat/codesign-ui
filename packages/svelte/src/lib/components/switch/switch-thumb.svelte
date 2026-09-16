<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SwitchThumbBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface SwitchThumbProps extends Assign<HTMLProps<'span'>, SwitchThumbBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useSwitchContext } from './use-switch-context.ts'

  let { ref = $bindable(null), ...props }: SwitchThumbProps = $props()

  const switchMachine = useSwitchContext()
  const mergedProps = $derived(mergeProps(switchMachine().getThumbProps(), props))
</script>

<Codesign as="span" bind:ref {...mergedProps} />
