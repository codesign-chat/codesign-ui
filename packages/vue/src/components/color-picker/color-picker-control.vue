<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ColorPickerControlBaseProps extends PolymorphicProps {}
export interface ColorPickerControlProps
  extends
    ColorPickerControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useColorPickerContext } from './use-color-picker-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ColorPickerControlProps>()
const colorPicker = useColorPickerContext()
useForwardExpose()
</script>

<template>
  <codesign.div v-bind="colorPicker.getControlProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
