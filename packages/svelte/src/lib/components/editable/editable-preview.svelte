<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface EditablePreviewBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface EditablePreviewProps extends Assign<HTMLProps<'span'>, EditablePreviewBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useEditableContext } from './use-editable-context.ts'

  let { ref = $bindable(null), ...props }: EditablePreviewProps = $props()

  const editable = useEditableContext()
  const mergedProps = $derived(mergeProps(editable().getPreviewProps(), props))
</script>

<Codesign as="span" bind:ref {...mergedProps}>
  {#if props.children}
    {@render props.children()}
  {:else}
    {editable().valueText}
  {/if}
</Codesign>
