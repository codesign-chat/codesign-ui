<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseTagsInputReturn } from './use-tags-input.svelte.ts'

  export interface TagsInputRootProviderBaseProps extends PolymorphicProps<'div'>, RefAttribute {
    value: UseTagsInputReturn
  }
  export interface TagsInputRootProviderProps extends Assign<HTMLProps<'div'>, TagsInputRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { TagsInputProvider } from './use-tags-input-context.ts'

  let { ref = $bindable(null), value, ...props }: TagsInputRootProviderProps = $props()

  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  TagsInputProvider(() => value())
</script>

<Codesign as="div" bind:ref {...mergedProps} />
