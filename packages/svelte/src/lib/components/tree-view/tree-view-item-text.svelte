<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TreeViewItemTextBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface TreeViewItemTextProps extends Assign<HTMLProps<'span'>, TreeViewItemTextBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Codesign } from '../factory/index.ts'
  import { useTreeViewContext } from './use-tree-view-context.ts'
  import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context.ts'

  let { ref = $bindable(null), ...props }: TreeViewItemTextProps = $props()

  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()

  const mergedProps = $derived(mergeProps(treeView().getItemTextProps(nodeProps()), props))
</script>

<Codesign as="span" bind:ref {...mergedProps} />
