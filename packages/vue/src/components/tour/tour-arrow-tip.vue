<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface TourArrowTipBaseProps extends PolymorphicProps {}
export interface TourArrowTipProps
  extends
    TourArrowTipBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useTourContext } from './use-tour-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<TourArrowTipProps>()
const tour = useTourContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="tour.getArrowTipProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
