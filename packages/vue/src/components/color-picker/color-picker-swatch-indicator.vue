<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ColorPickerSwatchIndicatorBaseProps extends PolymorphicProps {}
export interface ColorPickerSwatchIndicatorProps
  extends
    ColorPickerSwatchIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useColorPickerContext } from './use-color-picker-context.ts'
import { useColorPickerSwatchPropsContext } from './use-color-picker-swatch-props-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ColorPickerSwatchIndicatorProps>()
const colorPicker = useColorPickerContext()
const swatchProps = useColorPickerSwatchPropsContext()
useForwardExpose()
</script>

<template>
  <codesign.div v-bind="colorPicker.getSwatchIndicatorProps(swatchProps)" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
