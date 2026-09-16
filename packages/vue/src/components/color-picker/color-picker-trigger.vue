<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ColorPickerTriggerBaseProps extends PolymorphicProps {}
export interface ColorPickerTriggerProps
  extends
    ColorPickerTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useColorPickerContext } from './use-color-picker-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ColorPickerTriggerProps>()
const colorPicker = useColorPickerContext()

useForwardExpose()
</script>

<template>
  <codesign.button v-bind="colorPicker.getTriggerProps()" :as-child="asChild">
    <slot />
  </codesign.button>
</template>
