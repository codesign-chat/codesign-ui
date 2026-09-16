<script lang="ts">
import type { SelectHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ColorPickerFormatSelectBaseProps extends PolymorphicProps {}
export interface ColorPickerFormatSelectProps
  extends
    ColorPickerFormatSelectBaseProps,
    /**
     * @vue-ignore
     */
    SelectHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useColorPickerContext } from './use-color-picker-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ColorPickerFormatSelectProps>()
const colorPicker = useColorPickerContext()

useForwardExpose()
</script>

<template>
  <codesign.select v-bind="colorPicker.getFormatSelectProps()">
    <codesign.option v-for="format in ['rgba', 'hsla', 'hsba']" :key="format" :value="format">
      {{ format }}
    </codesign.option>
  </codesign.select>
</template>
