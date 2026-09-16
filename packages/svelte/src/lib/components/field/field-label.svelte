<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface FieldLabelBaseProps extends PolymorphicProps<'label'>, RefAttribute {}
  export interface FieldLabelProps extends Assign<HTMLProps<'label'>, FieldLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useFieldContext } from './use-field-context.ts'

  let { ref = $bindable(null), ...props }: FieldLabelProps = $props()
  const field = useFieldContext()
  const mergedProps = $derived(mergeProps(field?.()?.getLabelProps() ?? {}, props))
</script>

<Codesign as="label" bind:ref {...mergedProps} />
