<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TagsInputInputBaseProps extends PolymorphicProps<'input'>, RefAttribute {}
  export interface TagsInputInputProps extends Assign<HTMLProps<'input'>, TagsInputInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useTagsInputContext } from './use-tags-input-context.ts'

  let { ref = $bindable(null), ...props }: TagsInputInputProps = $props()
  const tagsInput = useTagsInputContext()
  const mergedProps = $derived(mergeProps(tagsInput().getInputProps(), props))
</script>

<Codesign as="input" bind:ref {...mergedProps} />
