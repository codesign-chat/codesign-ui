<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface NumberInputInputBaseProps extends PolymorphicProps<'input'>, RefAttribute {}
  export interface NumberInputInputProps extends Assign<HTMLProps<'input'>, NumberInputInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useFieldContext } from '../field/index.ts'
  import { useNumberInputContext } from './use-number-input-context.ts'

  let { ref = $bindable(null), ...props }: NumberInputInputProps = $props()

  const numberInput = useNumberInputContext()
  const field = useFieldContext()
  const mergedProps = $derived(mergeProps(numberInput().getInputProps(), props))
</script>

<Codesign as="input" bind:ref aria-describedby={field?.()?.ariaDescribedby} {...mergedProps} />
