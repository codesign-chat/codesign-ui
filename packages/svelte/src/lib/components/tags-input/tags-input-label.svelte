<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TagsInputLabelBaseProps extends PolymorphicProps<'label'>, RefAttribute {}
  export interface TagsInputLabelProps extends Assign<HTMLProps<'label'>, TagsInputLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useTagsInputContext } from './use-tags-input-context.ts'

  let { ref = $bindable(null), ...props }: TagsInputLabelProps = $props()
  const tagsInput = useTagsInputContext()
  const mergedProps = $derived(mergeProps(tagsInput().getLabelProps(), props))
</script>

<Codesign as="label" bind:ref {...mergedProps} />
