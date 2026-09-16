<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface NumberInputScrubberBaseProps extends PolymorphicProps {}
export interface NumberInputScrubberProps
  extends
    NumberInputScrubberBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useNumberInputContext } from './use-number-input-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<NumberInputScrubberProps>()
const numberInput = useNumberInputContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="numberInput.getScrubberProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
