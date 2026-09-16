<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface RatingGroupLabelBaseProps extends PolymorphicProps {}
export interface RatingGroupLabelProps
  extends
    RatingGroupLabelBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useRatingGroupContext } from './use-rating-group-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<RatingGroupLabelProps>()
const ratingGroup = useRatingGroupContext()

useForwardExpose()
</script>

<template>
  <codesign.label v-bind="ratingGroup.getLabelProps()" :as-child="asChild">
    <slot />
  </codesign.label>
</template>
