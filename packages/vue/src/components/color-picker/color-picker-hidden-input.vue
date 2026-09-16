<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ColorPickerHiddenInputBaseProps extends PolymorphicProps {}
export interface ColorPickerHiddenInputProps
  extends
    ColorPickerHiddenInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useColorPickerContext } from './use-color-picker-context.ts'
import { useFieldContext } from '../field/index.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ColorPickerHiddenInputProps>()
const colorPicker = useColorPickerContext()
const field = useFieldContext()

useForwardExpose()
</script>

<template>
  <codesign.input :aria-describedby="field?.ariaDescribedby" v-bind="colorPicker.getHiddenInputProps()" :as-child="asChild">
    <slot />
  </codesign.input>
</template>
