<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface EditableAreaBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface EditableAreaProps extends Assign<HTMLProps<'div'>, EditableAreaBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useEditableContext } from './use-editable-context.ts'

  let { ref = $bindable(null), ...props }: EditableAreaProps = $props()

  const editable = useEditableContext()
  const mergedProps = $derived(mergeProps(editable().getAreaProps(), props))
</script>

<Codesign as="div" bind:ref {...mergedProps} />
