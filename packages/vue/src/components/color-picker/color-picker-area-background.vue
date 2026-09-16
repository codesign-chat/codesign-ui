<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ColorPickerAreaBackgroundBaseProps extends PolymorphicProps {}
export interface ColorPickerAreaBackgroundProps
  extends
    ColorPickerAreaBackgroundBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useColorPickerAreaPropsContext } from './use-color-picker-area-props-context.ts'
import { useColorPickerContext } from './use-color-picker-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ColorPickerAreaBackgroundProps>()
const colorPicker = useColorPickerContext()
const areaProps = useColorPickerAreaPropsContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="colorPicker.getAreaBackgroundProps(areaProps)" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
