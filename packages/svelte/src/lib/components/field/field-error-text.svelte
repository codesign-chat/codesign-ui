<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface FieldErrorTextBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface FieldErrorTextProps extends Assign<HTMLProps<'span'>, FieldErrorTextBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useFieldContext } from './use-field-context.ts'

  let { ref = $bindable(null), ...props }: FieldErrorTextProps = $props()
  const field = useFieldContext()
  const mergedProps = $derived(mergeProps(field?.()?.getErrorTextProps() ?? {}, props))
</script>

{#if field?.()?.invalid}
  <Codesign as="span" bind:ref {...mergedProps} />
{/if}
