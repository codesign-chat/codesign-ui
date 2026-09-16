<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ColorPickerEyeDropperTriggerBaseProps extends PolymorphicProps {}
export interface ColorPickerEyeDropperTriggerProps
  extends
    ColorPickerEyeDropperTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useColorPickerContext } from './use-color-picker-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ColorPickerEyeDropperTriggerProps>()
const colorPicker = useColorPickerContext()

useForwardExpose()
</script>

<template>
  <codesign.button v-bind="colorPicker.getEyeDropperTriggerProps()" :as-child="asChild">
    <slot />
  </codesign.button>
</template>
