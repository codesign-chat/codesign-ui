<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface NumberInputLabelBaseProps extends PolymorphicProps {}
export interface NumberInputLabelProps
  extends
    NumberInputLabelBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useNumberInputContext } from './use-number-input-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<NumberInputLabelProps>()
const numberInput = useNumberInputContext()

useForwardExpose()
</script>

<template>
  <codesign.label v-bind="numberInput.getLabelProps()" :as-child="asChild">
    <slot />
  </codesign.label>
</template>
