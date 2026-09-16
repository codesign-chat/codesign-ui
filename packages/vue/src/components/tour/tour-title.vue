<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface TourTitleBaseProps extends PolymorphicProps {}
export interface TourTitleProps
  extends
    TourTitleBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useTourContext } from './use-tour-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<TourTitleProps>()
const tour = useTourContext()
const slots = defineSlots()

useForwardExpose()
</script>

<template>
  <codesign.h2 v-bind="tour.getTitleProps()" :as-child="asChild">
    <slot>{{ slots.default?.() || tour.step?.title }}</slot>
  </codesign.h2>
</template>
