<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface AngleSliderMarkerGroupBaseProps extends PolymorphicProps {}
export interface AngleSliderMarkerGroupProps
  extends
    AngleSliderMarkerGroupBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useAngleSliderContext } from './use-angle-slider-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<AngleSliderMarkerGroupProps>()
const angleSlider = useAngleSliderContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="angleSlider.getMarkerGroupProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
