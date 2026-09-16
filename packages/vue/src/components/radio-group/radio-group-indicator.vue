<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface RadioGroupIndicatorBaseProps extends PolymorphicProps {}
export interface RadioGroupIndicatorProps
  extends
    RadioGroupIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useRadioGroupContext } from './use-radio-group-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<RadioGroupIndicatorProps>()
const radioGroup = useRadioGroupContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="radioGroup.getIndicatorProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
