<script lang="ts">
import type { ItemProps } from '@zag-js/carousel'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface CarouselItemBaseProps extends ItemProps, PolymorphicProps {}
export interface CarouselItemProps
  extends
    CarouselItemBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useCarouselContext } from './use-carousel-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<CarouselItemProps>()
const carousel = useCarouselContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="carousel.getItemProps(props)" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
