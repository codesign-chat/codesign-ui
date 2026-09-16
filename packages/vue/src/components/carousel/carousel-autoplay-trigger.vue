<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface CarouselAutoplayTriggerBaseProps extends PolymorphicProps {}
export interface CarouselAutoplayTriggerProps
  extends
    CarouselAutoplayTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useCarouselContext } from './use-carousel-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<CarouselAutoplayTriggerProps>()
const carousel = useCarouselContext()

useForwardExpose()
</script>

<template>
  <codesign.button v-bind="carousel.getAutoplayTriggerProps()" :as-child="asChild">
    <slot />
  </codesign.button>
</template>
