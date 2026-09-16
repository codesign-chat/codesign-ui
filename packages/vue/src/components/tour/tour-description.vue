<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface TourDescriptionBaseProps extends PolymorphicProps {}
export interface TourDescriptionProps
  extends
    TourDescriptionBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useTourContext } from './use-tour-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<TourDescriptionProps>()
const tour = useTourContext()
const slots = defineSlots()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="tour.getDescriptionProps()" :as-child="asChild">
    <slot>{{ slots.default?.() || tour.step?.description }}</slot>
  </codesign.div>
</template>
