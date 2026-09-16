<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface CarouselIndicatorGroupBaseProps extends PolymorphicProps {}
export interface CarouselIndicatorGroupProps
  extends
    CarouselIndicatorGroupBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useCarouselContext } from './use-carousel-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<CarouselIndicatorGroupProps>()
const carousel = useCarouselContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="carousel.getIndicatorGroupProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
