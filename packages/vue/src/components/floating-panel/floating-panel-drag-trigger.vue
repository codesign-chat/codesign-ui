<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface FloatingPanelDragTriggerBaseProps extends PolymorphicProps {}
export interface FloatingPanelDragTriggerProps
  extends
    FloatingPanelDragTriggerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useFloatingPanelContext } from './use-floating-panel-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<FloatingPanelDragTriggerProps>()
const floatingPanel = useFloatingPanelContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="floatingPanel.getDragTriggerProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
