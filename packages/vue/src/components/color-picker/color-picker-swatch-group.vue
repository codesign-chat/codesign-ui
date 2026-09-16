<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ColorPickerSwatchGroupBaseProps extends PolymorphicProps {}
export interface ColorPickerSwatchGroupProps
  extends
    ColorPickerSwatchGroupBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { colorPickerAnatomy } from './color-picker.anatomy.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ColorPickerSwatchGroupProps>()
useForwardExpose()
</script>

<template>
  <codesign.div v-bind="colorPickerAnatomy.build().swatchGroup.attrs" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
