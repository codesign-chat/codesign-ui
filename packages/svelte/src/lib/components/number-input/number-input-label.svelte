<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface NumberInputLabelBaseProps extends PolymorphicProps<'label'>, RefAttribute {}
  export interface NumberInputLabelProps extends Assign<HTMLProps<'label'>, NumberInputLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useNumberInputContext } from './use-number-input-context.ts'

  let { ref = $bindable(null), ...props }: NumberInputLabelProps = $props()

  const numberInput = useNumberInputContext()
  const mergedProps = $derived(mergeProps(numberInput().getLabelProps(), props))
</script>

<Codesign as="label" bind:ref {...mergedProps} />
