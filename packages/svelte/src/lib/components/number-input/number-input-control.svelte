<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface NumberInputControlBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface NumberInputControlProps extends Assign<HTMLProps<'div'>, NumberInputControlBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useNumberInputContext } from './use-number-input-context.ts'

  let { ref = $bindable(null), ...props }: NumberInputControlProps = $props()

  const numberInput = useNumberInputContext()
  const mergedProps = $derived(mergeProps(numberInput().getControlProps(), props))
</script>

<Codesign as="div" bind:ref {...mergedProps} />
