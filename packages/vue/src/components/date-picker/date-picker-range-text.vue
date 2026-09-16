<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface DatePickerRangeTextBaseProps extends PolymorphicProps {}
export interface DatePickerRangeTextProps
  extends
    DatePickerRangeTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { uniq } from '@zag-js/utils'
import { computed } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { codesign } from '../factory.ts'
import { useDatePickerContext } from './use-date-picker-context.ts'

defineProps<DatePickerRangeTextProps>()
const datePicker = useDatePickerContext()

const visibleRangeText = computed(() => {
  const { start, end } = datePicker.value.visibleRangeText
  return uniq([start, end]).filter(Boolean).join(' - ')
})

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="datePicker.getRangeTextProps()" :as-child="asChild">
    {{ visibleRangeText }}
  </codesign.div>
</template>
