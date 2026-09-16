<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface DateInputLabelBaseProps extends PolymorphicProps {}
export interface DateInputLabelProps
  extends
    DateInputLabelBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useDateInputContext } from './use-date-input-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<DateInputLabelProps>()
const dateInput = useDateInputContext()

useForwardExpose()
</script>

<template>
  <codesign.label v-bind="dateInput.getLabelProps()" :as-child="asChild">
    <slot />
  </codesign.label>
</template>
