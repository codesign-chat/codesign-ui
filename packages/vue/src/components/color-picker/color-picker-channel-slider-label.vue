<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ColorPickerChannelSliderLabelBaseProps extends PolymorphicProps {}
export interface ColorPickerChannelSliderLabelProps
  extends
    ColorPickerChannelSliderLabelBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useColorPickerChannelPropsContext } from './use-color-picker-channel-props-context.ts'
import { useColorPickerContext } from './use-color-picker-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ColorPickerChannelSliderLabelProps>()
const colorPicker = useColorPickerContext()
const channelProps = useColorPickerChannelPropsContext()
useForwardExpose()
</script>

<template>
  <codesign.label v-bind="colorPicker.getChannelSliderLabelProps(channelProps)" :as-child="asChild">
    <slot />
  </codesign.label>
</template>
