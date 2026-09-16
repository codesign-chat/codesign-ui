<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface DatePickerLabelBaseProps extends PolymorphicProps {}
export interface DatePickerLabelProps
  extends
    DatePickerLabelBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useDatePickerContext } from './use-date-picker-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<DatePickerLabelProps>()
const datePicker = useDatePickerContext()

useForwardExpose()
</script>

<template>
  <codesign.label v-bind="datePicker.getLabelProps()" :as-child="asChild">
    <slot />
  </codesign.label>
</template>
