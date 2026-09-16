<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface HoverCardArrowBaseProps extends PolymorphicProps {}
export interface HoverCardArrowProps
  extends
    HoverCardArrowBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useHoverCardContext } from './use-hover-card-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<HoverCardArrowProps>()
const hoverCard = useHoverCardContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="hoverCard.getArrowProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
