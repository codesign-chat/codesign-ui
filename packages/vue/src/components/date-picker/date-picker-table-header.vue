<script lang="ts">
import type { ThHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface DatePickerTableHeaderBaseProps extends PolymorphicProps {}
export interface DatePickerTableHeaderProps
  extends
    DatePickerTableHeaderBaseProps,
    /**
     * @vue-ignore
     */
    ThHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useDatePickerContext } from './use-date-picker-context.ts'
import { useDatePickerTablePropsContext } from './use-date-picker-table-props-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<DatePickerTableHeaderProps>()
const datePicker = useDatePickerContext()
const tableProps = useDatePickerTablePropsContext()

useForwardExpose()
</script>

<template>
  <codesign.th v-bind="datePicker.getTableHeaderProps(tableProps)" :as-child="asChild">
    <slot />
  </codesign.th>
</template>
