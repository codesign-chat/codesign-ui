<script lang="ts">
import type { SelectHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface DatePickerYearSelectBaseProps extends PolymorphicProps {}
export interface DatePickerYearSelectProps
  extends
    DatePickerYearSelectBaseProps,
    /**
     * @vue-ignore
     */
    SelectHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useDatePickerContext } from './use-date-picker-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<DatePickerYearSelectProps>()
const datePicker = useDatePickerContext()

useForwardExpose()
</script>

<template>
  <codesign.select v-bind="datePicker.getYearSelectProps()" :as-child="asChild">
    <option v-for="year in datePicker.getYears()" :key="year.value" :value="year.value">
      {{ year.label }}
    </option>
  </codesign.select>
</template>
