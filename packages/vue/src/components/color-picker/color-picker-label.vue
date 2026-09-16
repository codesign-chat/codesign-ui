<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ColorPickerLabelBaseProps extends PolymorphicProps {}
export interface ColorPickerLabelProps
  extends
    ColorPickerLabelBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useColorPickerContext } from './use-color-picker-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ColorPickerLabelProps>()
const colorPicker = useColorPickerContext()

useForwardExpose()
</script>

<template>
  <codesign.label v-bind="colorPicker.getLabelProps()" :as-child="asChild">
    <slot />
  </codesign.label>
</template>
