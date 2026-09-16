<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface FloatingPanelTitleBaseProps extends PolymorphicProps {}
export interface FloatingPanelTitleProps
  extends
    FloatingPanelTitleBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { codesign } from '../factory.ts'
import { useFloatingPanelContext } from './use-floating-panel-context.ts'

defineProps<FloatingPanelTitleProps>()
const floatingPanel = useFloatingPanelContext()

useForwardExpose()
</script>

<template>
  <codesign.h2 v-bind="floatingPanel.getTitleProps()" :as-child="asChild">
    <slot />
  </codesign.h2>
</template>
