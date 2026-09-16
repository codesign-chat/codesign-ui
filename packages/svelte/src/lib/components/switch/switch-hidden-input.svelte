<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SwitchHiddenInputBaseProps extends PolymorphicProps<'input'>, RefAttribute {}
  export interface SwitchHiddenInputProps extends Assign<HTMLProps<'input'>, SwitchHiddenInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useSwitchContext } from './use-switch-context.ts'

  let { ref = $bindable(null), ...props }: SwitchHiddenInputProps = $props()

  const switchMachine = useSwitchContext()
  const mergedProps = $derived(mergeProps(switchMachine().getHiddenInputProps(), props))
</script>

<Codesign as="input" bind:ref {...mergedProps} />
