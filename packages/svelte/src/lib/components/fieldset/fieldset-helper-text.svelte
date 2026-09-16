<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface FieldsetHelperTextBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface FieldsetHelperTextProps extends Assign<HTMLProps<'span'>, FieldsetHelperTextBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useFieldsetContext } from './use-fieldset-context.ts'

  let { ref = $bindable(null), ...props }: FieldsetHelperTextProps = $props()
  const fieldset = useFieldsetContext()
  const mergedProps = $derived(mergeProps(fieldset?.().getHelperTextProps(), props))
</script>

<Codesign as="span" bind:ref {...mergedProps} />
