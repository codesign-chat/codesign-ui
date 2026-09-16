<script lang="ts">
import type { TriggerProps } from '@zag-js/hover-card'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface HoverCardTriggerBaseProps extends TriggerProps, PolymorphicProps {}
export interface HoverCardTriggerProps
  extends
    HoverCardTriggerBaseProps,
    /**
     * @vue-ignore
     */
    Omit<ButtonHTMLAttributes, 'value'> {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useHoverCardContext } from './use-hover-card-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<HoverCardTriggerProps>()
const hoverCard = useHoverCardContext()

useForwardExpose()
</script>

<template>
  <codesign.button v-bind="hoverCard.getTriggerProps(props)" :as-child="asChild">
    <slot />
  </codesign.button>
</template>
