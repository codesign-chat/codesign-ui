<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface FieldHelperTextBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface FieldHelperTextProps extends Assign<HTMLProps<'span'>, FieldHelperTextBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useFieldContext } from './use-field-context.ts'

  let { ref = $bindable(null), ...props }: FieldHelperTextProps = $props()
  const field = useFieldContext()
  const mergedProps = $derived(mergeProps(field?.()?.getHelperTextProps() ?? {}, props))
</script>

<Codesign as="span" bind:ref {...mergedProps} />
