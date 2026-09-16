<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface CarouselItemGroupBaseProps extends PolymorphicProps {}
export interface CarouselItemGroupProps
  extends
    CarouselItemGroupBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useCarouselContext } from './use-carousel-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<CarouselItemGroupProps>()
const carousel = useCarouselContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="carousel.getItemGroupProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
