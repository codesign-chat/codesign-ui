<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ComboboxLabelBaseProps extends PolymorphicProps {}
export interface ComboboxLabelProps
  extends
    ComboboxLabelBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useComboboxContext } from './use-combobox-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ComboboxLabelProps>()
const combobox = useComboboxContext()

useForwardExpose()
</script>

<template>
  <codesign.label v-bind="combobox.getLabelProps()" :as-child="asChild">
    <slot />
  </codesign.label>
</template>
