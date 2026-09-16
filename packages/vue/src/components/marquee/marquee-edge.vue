<script lang="ts">
import type { EdgeProps } from '@zag-js/marquee'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface MarqueeEdgeBaseProps extends EdgeProps, PolymorphicProps {}
export interface MarqueeEdgeProps
  extends
    MarqueeEdgeBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { useMarqueeContext } from './use-marquee-context.ts'

const props = defineProps<MarqueeEdgeProps>()
const marquee = useMarqueeContext()
useForwardExpose()
</script>

<template>
  <codesign.div v-bind="marquee.getEdgeProps({ side: props.side })" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
