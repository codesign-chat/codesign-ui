<script lang="ts">
import type { SwatchTriggerProps } from '@zag-js/color-picker'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ColorPickerSwatchTriggerBaseProps extends SwatchTriggerProps, PolymorphicProps {}
export interface ColorPickerSwatchTriggerProps
  extends
    ColorPickerSwatchTriggerBaseProps,
    /**
     * @vue-ignore
     */
    Omit<ButtonHTMLAttributes, 'disabled' | 'value'> {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useColorPickerContext } from './use-color-picker-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<ColorPickerSwatchTriggerProps>()
const colorPicker = useColorPickerContext()
useForwardExpose()
</script>

<template>
  <codesign.button v-bind="colorPicker.getSwatchTriggerProps(props)" :as-child="asChild">
    <slot />
  </codesign.button>
</template>
