<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface RatingGroupControlBaseProps extends PolymorphicProps {}
export interface RatingGroupControlProps
  extends
    RatingGroupControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useRatingGroupContext } from './use-rating-group-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<RatingGroupControlProps>()

const ratingGroup = useRatingGroupContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="ratingGroup.getControlProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
