<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface SliderLabelBaseProps extends PolymorphicProps {}
export interface SliderLabelProps
  extends
    SliderLabelBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useSliderContext } from './use-slider-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<SliderLabelProps>()
const slider = useSliderContext()

useForwardExpose()
</script>

<template>
  <codesign.label v-bind="slider.getLabelProps()" :as-child="asChild">
    <slot />
  </codesign.label>
</template>
