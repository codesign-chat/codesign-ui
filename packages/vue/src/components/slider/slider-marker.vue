<script lang="ts">
import type { MarkerProps } from '@zag-js/slider'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface SliderMarkerBaseProps extends MarkerProps, PolymorphicProps {}
export interface SliderMarkerProps
  extends
    SliderMarkerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useSliderContext } from './use-slider-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<SliderMarkerProps>()
const slider = useSliderContext()

useForwardExpose()
</script>

<template>
  <codesign.span v-bind="slider.getMarkerProps(props)" :as-child="asChild">
    <slot />
  </codesign.span>
</template>
