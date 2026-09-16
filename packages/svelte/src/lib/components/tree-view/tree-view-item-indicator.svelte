<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TreeViewItemIndicatorBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface TreeViewItemIndicatorProps extends Assign<HTMLProps<'div'>, TreeViewItemIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useTreeViewContext } from './use-tree-view-context.ts'
  import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context.ts'

  let { ref = $bindable(null), ...props }: TreeViewItemIndicatorProps = $props()

  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()

  const mergedProps = $derived(mergeProps(treeView().getItemIndicatorProps(nodeProps()), props))
</script>

<Codesign as="div" bind:ref {...mergedProps} />
