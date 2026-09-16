<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface AngleSliderThumbBaseProps extends PolymorphicProps {}
export interface AngleSliderThumbProps
  extends
    AngleSliderThumbBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useAngleSliderContext } from './use-angle-slider-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<AngleSliderThumbProps>()

const angleSlider = useAngleSliderContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="angleSlider.getThumbProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
