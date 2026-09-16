<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface TreeViewLabelBaseProps extends PolymorphicProps {}
export interface TreeViewLabelProps
  extends
    TreeViewLabelBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { codesign } from '../factory.ts'
import { useTreeViewContext } from './use-tree-view-context.ts'

defineProps<TreeViewLabelProps>()
const treeView = useTreeViewContext()

useForwardExpose()
</script>

<template>
  <codesign.h3 v-bind="treeView.getLabelProps()" :as-child="asChild">
    <slot />
  </codesign.h3>
</template>
