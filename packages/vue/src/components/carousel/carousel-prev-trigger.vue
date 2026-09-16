<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface CarouselPrevTriggerBaseProps extends PolymorphicProps {}
export interface CarouselPrevTriggerProps
  extends
    CarouselPrevTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useCarouselContext } from './use-carousel-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<CarouselPrevTriggerProps>()
const carousel = useCarouselContext()

useForwardExpose()
</script>

<template>
  <codesign.button v-bind="carousel.getPrevTriggerProps()" :as-child="asChild">
    <slot />
  </codesign.button>
</template>
