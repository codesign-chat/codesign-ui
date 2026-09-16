<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { Snippet } from 'svelte'
  import type { TreeNode } from '../collection/index.ts'
  import type { UseTreeViewReturn } from './use-tree-view.svelte.ts'

  export interface TreeViewRootProviderBaseProps<T extends TreeNode>
    extends RenderStrategyProps, PolymorphicProps<'div'>, RefAttribute {
    value: UseTreeViewReturn<T>
  }
  export interface TreeViewRootProviderProps<T extends TreeNode> extends Assign<
    HTMLProps<'div'>,
    TreeViewRootProviderBaseProps<T>
  > {}

  export type TreeViewRootProviderComponent<P = {}> = <T extends TreeNode>(
    props: Assign<TreeViewRootProviderProps<T>, P>,
  ) => Snippet
</script>

<script lang="ts" generics="T extends TreeNode">
  import {
    RenderStrategyPropsProvider,
    splitRenderStrategyProps,
    type RenderStrategyProps,
  } from '$lib/utils/render-strategy'
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { TreeViewProvider } from './use-tree-view-context.ts'

  let { ref = $bindable(null), value, ...props }: TreeViewRootProviderProps<T> = $props()

  const [renderStrategyProps, treeViewProps] = $derived(splitRenderStrategyProps(props))
  const mergedProps = $derived(mergeProps(value().getRootProps(), treeViewProps))

  TreeViewProvider(() => value())
  RenderStrategyPropsProvider(() => renderStrategyProps)
</script>

<Codesign as="div" bind:ref {...mergedProps} />
