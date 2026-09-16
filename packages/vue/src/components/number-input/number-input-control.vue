<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface NumberInputControlBaseProps extends PolymorphicProps {}
export interface NumberInputControlProps
  extends
    NumberInputControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useNumberInputContext } from './use-number-input-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<NumberInputControlProps>()
const numberInput = useNumberInputContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="numberInput.getControlProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
