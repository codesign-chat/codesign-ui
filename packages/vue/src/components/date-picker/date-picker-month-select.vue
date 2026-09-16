<script lang="ts">
import type { SelectHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface DatePickerMonthSelectBaseProps extends PolymorphicProps {}
export interface DatePickerMonthSelectProps
  extends
    DatePickerMonthSelectBaseProps,
    /**
     * @vue-ignore
     */
    SelectHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useDatePickerContext } from './use-date-picker-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<DatePickerMonthSelectProps>()
const datePicker = useDatePickerContext()

useForwardExpose()
</script>

<template>
  <codesign.select v-bind="datePicker.getMonthSelectProps()" :as-child="asChild">
    <option v-for="month in datePicker.getMonths()" :key="month.value" :value="month.value">
      {{ month.label }}
    </option>
  </codesign.select>
</template>
