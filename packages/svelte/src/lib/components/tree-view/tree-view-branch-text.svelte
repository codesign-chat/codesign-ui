<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TreeViewBranchTextBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface TreeViewBranchTextProps extends Assign<HTMLProps<'span'>, TreeViewBranchTextBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useTreeViewContext } from './use-tree-view-context.ts'
  import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context.ts'

  let { ref = $bindable(null), ...props }: TreeViewBranchTextProps = $props()

  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = $derived(mergeProps(treeView().getBranchTextProps(nodeProps()), props))
</script>

<Codesign as="span" bind:ref {...mergedProps} />
