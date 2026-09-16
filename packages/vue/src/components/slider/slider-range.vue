<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface SliderRangeBaseProps extends PolymorphicProps {}
export interface SliderRangeProps
  extends
    SliderRangeBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useSliderContext } from './use-slider-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<SliderRangeProps>()
const slider = useSliderContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="slider.getRangeProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
