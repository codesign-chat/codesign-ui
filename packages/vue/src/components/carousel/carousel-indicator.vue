<script lang="ts">
import type { IndicatorProps } from '@zag-js/carousel'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface CarouselIndicatorBaseProps extends IndicatorProps, PolymorphicProps {}
export interface CarouselIndicatorProps
  extends
    CarouselIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useCarouselContext } from './use-carousel-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<CarouselIndicatorProps>()
const carousel = useCarouselContext()

useForwardExpose()
</script>

<template>
  <codesign.button v-bind="carousel.getIndicatorProps(props)" :as-child="asChild">
    <slot />
  </codesign.button>
</template>
