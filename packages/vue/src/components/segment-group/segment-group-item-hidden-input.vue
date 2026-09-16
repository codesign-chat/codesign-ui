<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface SegmentGroupItemHiddenInputBaseProps extends PolymorphicProps {}
export interface SegmentGroupItemHiddenInputProps
  extends
    SegmentGroupItemHiddenInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useSegmentGroupContext } from './use-segment-group-context.ts'
import { useSegmentGroupItemPropsContext } from './use-segment-group-item-props-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<SegmentGroupItemHiddenInputProps>()

const segmentGroup = useSegmentGroupContext()
const itemProps = useSegmentGroupItemPropsContext()

useForwardExpose()
</script>

<template>
  <codesign.input v-bind="segmentGroup.getItemHiddenInputProps(itemProps)" :as-child="asChild">
    <slot />
  </codesign.input>
</template>
