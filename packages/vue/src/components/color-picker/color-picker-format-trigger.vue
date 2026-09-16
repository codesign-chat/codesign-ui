<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ColorPickerFormatTriggerBaseProps extends PolymorphicProps {}
export interface ColorPickerFormatTriggerProps
  extends
    ColorPickerFormatTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useColorPickerContext } from './use-color-picker-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ColorPickerFormatTriggerProps>()
const colorPicker = useColorPickerContext()

useForwardExpose()
</script>

<template>
  <codesign.button v-bind="colorPicker.getFormatTriggerProps()" :as-child="asChild">
    <slot />
  </codesign.button>
</template>
