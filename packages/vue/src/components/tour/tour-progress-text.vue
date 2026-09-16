<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface TourProgressTextBaseProps extends PolymorphicProps {}
export interface TourProgressTextProps
  extends
    TourProgressTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useTourContext } from './use-tour-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<TourProgressTextProps>()
const tour = useTourContext()
const slots = defineSlots()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="tour.getProgressTextProps()" :as-child="asChild">
    <slot>{{ slots.default?.() || tour.getProgressText() }}</slot>
  </codesign.div>
</template>
