<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface TourCloseTriggerBaseProps extends PolymorphicProps {}
export interface TourCloseTriggerProps
  extends
    TourCloseTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useTourContext } from './use-tour-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<TourCloseTriggerProps>()
const tour = useTourContext()

useForwardExpose()
</script>

<template>
  <codesign.button v-bind="tour.getCloseTriggerProps()" :as-child="asChild">
    <slot />
  </codesign.button>
</template>
