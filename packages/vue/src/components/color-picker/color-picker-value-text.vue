<script lang="ts">
import type { ColorStringFormat } from '@zag-js/color-utils'
import { type HTMLAttributes, computed } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ColorPickerValueTextBaseProps extends PolymorphicProps {
  format?: ColorStringFormat
}
export interface ColorPickerValueTextProps
  extends
    ColorPickerValueTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { codesign } from '../factory.ts'
import { useColorPickerContext } from './use-color-picker-context.ts'

const props = defineProps<ColorPickerValueTextProps>()
const colorPicker = useColorPickerContext()
const slots = defineSlots()

useForwardExpose()

const valueAsString = computed(() =>
  props.format ? colorPicker.value.value.toString(props.format) : colorPicker.value.valueAsString,
)
</script>

<template>
  <codesign.span v-bind="colorPicker.getValueTextProps()" :as-child="asChild">
    <slot>
      {{ slots.default?.() || valueAsString }}
    </slot>
  </codesign.span>
</template>
