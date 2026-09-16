<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface TreeViewTreeBaseProps extends PolymorphicProps {}
export interface TreeViewTreeProps
  extends
    TreeViewTreeBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useTreeViewContext } from './use-tree-view-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<TreeViewTreeProps>()
const treeView = useTreeViewContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="treeView.getTreeProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
