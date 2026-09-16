<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ScrollAreaViewportBaseProps extends PolymorphicProps {}
export interface ScrollAreaViewportProps
  extends
    ScrollAreaViewportBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { codesign } from '../factory.ts'
import { useScrollAreaContext } from './use-scroll-area-context.ts'

defineProps<ScrollAreaViewportProps>()
const scrollArea = useScrollAreaContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="scrollArea.getViewportProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
