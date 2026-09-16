<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TreeViewTreeBaseProps extends PolymorphicProps<'ul'>, RefAttribute {}
  export interface TreeViewTreeProps extends Assign<HTMLProps<'ul'>, TreeViewTreeBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useTreeViewContext } from './use-tree-view-context.ts'

  let { ref = $bindable(null), ...props }: TreeViewTreeProps = $props()

  const treeView = useTreeViewContext()
  const mergedProps = $derived(mergeProps(treeView().getTreeProps(), props))
</script>

<Codesign as="div" bind:ref {...mergedProps} />
