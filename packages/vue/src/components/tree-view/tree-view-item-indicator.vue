<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface TreeViewItemIndicatorBaseProps extends PolymorphicProps {}
export interface TreeViewItemIndicatorProps
  extends
    TreeViewItemIndicatorBaseProps,
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

defineProps<TreeViewItemIndicatorProps>()

const treeView = useTreeViewContext()
const nodeProps = useTreeViewNodePropsContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="treeView.getItemIndicatorProps(nodeProps)" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
