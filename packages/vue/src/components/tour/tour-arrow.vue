<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface TourArrowBaseProps extends PolymorphicProps {}
export interface TourArrowProps
  extends
    TourArrowBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useTourContext } from './use-tour-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<TourArrowProps>()
const tour = useTourContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-if="tour.step?.arrow" v-bind="tour.getArrowProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
