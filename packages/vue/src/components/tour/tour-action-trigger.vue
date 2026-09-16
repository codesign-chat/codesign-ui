<script lang="ts">
import type { StepActionTriggerProps } from '@zag-js/tour'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface TourActionTriggerBaseProps extends StepActionTriggerProps, PolymorphicProps {}
export interface TourActionTriggerProps
  extends
    TourActionTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useTourContext } from './use-tour-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<TourActionTriggerBaseProps>()
const tour = useTourContext()
const slots = defineSlots()

useForwardExpose()
</script>

<template>
  <codesign.button v-bind="tour.getActionTriggerProps(props)" :as-child="asChild">
    <slot>{{ slots.default?.() || props.action.label }}</slot>
  </codesign.button>
</template>
