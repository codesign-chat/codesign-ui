<script lang="ts">
import { mergeProps } from '@zag-js/vue'
import { type HTMLAttributes, computed } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface FloatingPanelContentBaseProps extends PolymorphicProps {}
export interface FloatingPanelContentProps
  extends
    FloatingPanelContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useFloatingPanelContext } from './use-floating-panel-context.ts'
import { usePresenceContext } from '../presence/index.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<FloatingPanelContentProps>()

const floatingPanel = useFloatingPanelContext()
const presence = usePresenceContext()

const mergedProps = computed(() => mergeProps(floatingPanel.value.getContentProps(), presence.value.presenceProps))

useForwardExpose()
</script>

<template>
  <codesign.div v-if="!presence.unmounted" v-bind="mergedProps" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
