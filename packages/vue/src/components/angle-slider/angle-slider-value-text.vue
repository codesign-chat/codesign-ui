<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface AngleSliderValueTextBaseProps extends PolymorphicProps {}
export interface AngleSliderValueTextProps
  extends
    AngleSliderValueTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useAngleSliderContext } from './use-angle-slider-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<AngleSliderValueTextProps>()
const angleSlider = useAngleSliderContext()
const slots = defineSlots()

useForwardExpose()
</script>

<template>
  <codesign.span v-bind="angleSlider.getValueTextProps()" :as-child="asChild">
    <slot>{{ slots.default?.() || angleSlider.valueAsDegree }}</slot>
  </codesign.span>
</template>
