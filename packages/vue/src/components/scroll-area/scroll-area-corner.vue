<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ScrollAreaCornerBaseProps extends PolymorphicProps {}
export interface ScrollAreaCornerProps
  extends
    ScrollAreaCornerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { codesign } from '../factory.ts'
import { useScrollAreaContext } from './use-scroll-area-context.ts'

defineProps<ScrollAreaCornerProps>()
const scrollArea = useScrollAreaContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="scrollArea.getCornerProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
