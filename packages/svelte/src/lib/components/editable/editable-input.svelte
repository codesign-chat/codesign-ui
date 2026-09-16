<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface EditableInputBaseProps extends PolymorphicProps<'input'>, RefAttribute {}
  export interface EditableInputProps extends Assign<HTMLProps<'input'>, EditableInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useEditableContext } from './use-editable-context.ts'

  let { ref = $bindable(null), ...props }: EditableInputProps = $props()

  const editable = useEditableContext()
  const mergedProps = $derived(mergeProps(editable().getInputProps(), props))
</script>

<Codesign as="input" bind:ref {...mergedProps} />
