<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface SegmentGroupItemTextBaseProps extends PolymorphicProps {}
export interface SegmentGroupItemTextProps
  extends
    SegmentGroupItemTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useSegmentGroupContext } from './use-segment-group-context.ts'
import { useSegmentGroupItemPropsContext } from './use-segment-group-item-props-context.ts'
import { parts } from './segment-group.anatomy.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<SegmentGroupItemTextProps>()

const segmentGroup = useSegmentGroupContext()
const itemProps = useSegmentGroupItemPropsContext()

useForwardExpose()
</script>

<template>
  <codesign.span
    v-bind="segmentGroup.getItemTextProps(itemProps)"
    :data-scope="parts.itemText.attrs['data-scope']"
    :data-part="parts.itemText.attrs['data-part']"
    :as-child="asChild"
  >
    <slot />
  </codesign.span>
</template>
