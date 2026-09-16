<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface DatePickerTriggerBaseProps extends PolymorphicProps {}
export interface DatePickerTriggerProps
  extends
    DatePickerTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useDatePickerContext } from './use-date-picker-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<DatePickerTriggerProps>()
const datePicker = useDatePickerContext()

useForwardExpose()
</script>

<template>
  <codesign.button v-bind="datePicker.getTriggerProps()" :as-child="asChild">
    <slot />
  </codesign.button>
</template>
