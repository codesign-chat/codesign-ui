<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TagsInputHiddenInputBaseProps extends PolymorphicProps<'input'>, RefAttribute {}
  export interface TagsInputHiddenInputProps extends Assign<HTMLProps<'input'>, TagsInputHiddenInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useTagsInputContext } from './use-tags-input-context.ts'

  let { ref = $bindable(null), ...props }: TagsInputHiddenInputProps = $props()
  const tagsInput = useTagsInputContext()
  const mergedProps = $derived(mergeProps(tagsInput().getHiddenInputProps(), props))
</script>

<Codesign as="input" bind:ref {...mergedProps} />
