<script lang="ts">
import { mergeProps } from '@zag-js/vue'
import { type HTMLAttributes, computed } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import { usePresenceContext } from '../presence/index.ts'

export interface TooltipContentBaseProps extends PolymorphicProps {}
export interface TooltipContentProps
  extends
    TooltipContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useTooltipContext } from './use-tooltip-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<TooltipContentProps>()

const tooltip = useTooltipContext()
const presence = usePresenceContext()

const mergedProps = computed(() => mergeProps(tooltip.value.getContentProps(), presence.value.presenceProps))

useForwardExpose()
</script>

<template>
  <codesign.div v-if="!presence.unmounted" v-bind="mergedProps" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
