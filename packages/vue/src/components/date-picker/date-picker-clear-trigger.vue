<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface DatePickerClearTriggerBaseProps extends PolymorphicProps {}
export interface DatePickerClearTriggerProps
  extends
    DatePickerClearTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useDatePickerContext } from './use-date-picker-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<DatePickerClearTriggerProps>()
const datePicker = useDatePickerContext()

useForwardExpose()
</script>

<template>
  <codesign.button v-bind="datePicker.getClearTriggerProps()" :as-child="asChild">
    <slot />
  </codesign.button>
</template>
