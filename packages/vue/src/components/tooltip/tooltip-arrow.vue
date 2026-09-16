<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface TooltipArrowBaseProps extends PolymorphicProps {}
export interface TooltipArrowProps
  extends
    TooltipArrowBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useTooltipContext } from './use-tooltip-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<TooltipArrowProps>()
const tooltip = useTooltipContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="tooltip.getArrowProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
