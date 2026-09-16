<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface NumberInputDecrementTriggerBaseProps extends PolymorphicProps {}
export interface NumberInputDecrementTriggerProps
  extends
    NumberInputDecrementTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useNumberInputContext } from './use-number-input-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<NumberInputDecrementTriggerProps>()
const numberInput = useNumberInputContext()

useForwardExpose()
</script>

<template>
  <codesign.button v-bind="numberInput.getDecrementTriggerProps()" :as-child="asChild">
    <slot />
  </codesign.button>
</template>
