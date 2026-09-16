<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface CarouselAutoplayIndicatorBaseProps extends PolymorphicProps {
  /**
   * The fallback content to render when autoplay is paused.
   */
  fallback?: string
}
export interface CarouselAutoplayIndicatorProps
  extends
    CarouselAutoplayIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { carouselAnatomy } from './carousel.anatomy.ts'
import { useCarouselContext } from './use-carousel-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const parts = carouselAnatomy.build()

defineProps<CarouselAutoplayIndicatorProps>()
const carousel = useCarouselContext()

useForwardExpose()
</script>

<template>
  <codesign.span v-bind="parts.autoplayIndicator.attrs" :as-child="asChild">
    <template v-if="carousel.isPlaying">
      <slot />
    </template>
    <template v-else>
      <slot name="fallback" :fallback="fallback">
        {{ fallback }}
      </slot>
    </template>
  </codesign.span>
</template>
