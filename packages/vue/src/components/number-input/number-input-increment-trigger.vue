<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface NumberInputIncrementTriggerBaseProps extends PolymorphicProps {}
export interface NumberInputIncrementTriggerProps
  extends
    NumberInputIncrementTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useNumberInputContext } from './use-number-input-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
defineProps<NumberInputIncrementTriggerProps>()
const numberInput = useNumberInputContext()

useForwardExpose()
</script>

<template>
  <codesign.button v-bind="numberInput.getIncrementTriggerProps()" :as-child="asChild">
    <slot />
  </codesign.button>
</template>
