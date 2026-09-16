<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface TreeViewBranchTextBaseProps extends PolymorphicProps {}
export interface TreeViewBranchTextProps
  extends
    TreeViewBranchTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { codesign } from '../factory.ts'
import { useTreeViewContext } from './use-tree-view-context.ts'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context.ts'

defineProps<TreeViewBranchTextProps>()

const treeView = useTreeViewContext()
const nodeProps = useTreeViewNodePropsContext()

useForwardExpose()
</script>

<template>
  <codesign.span v-bind="treeView.getBranchTextProps(nodeProps)" :as-child="asChild">
    <slot />
  </codesign.span>
</template>
