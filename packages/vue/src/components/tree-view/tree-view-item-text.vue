<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface TreeViewItemTextBaseProps extends PolymorphicProps {}
export interface TreeViewItemTextProps
  extends
    TreeViewItemTextBaseProps,
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

defineProps<TreeViewItemTextProps>()

const treeView = useTreeViewContext()
const nodeProps = useTreeViewNodePropsContext()

useForwardExpose()
</script>

<template>
  <codesign.span v-bind="treeView.getItemTextProps(nodeProps)" :as-child="asChild">
    <slot />
  </codesign.span>
</template>
