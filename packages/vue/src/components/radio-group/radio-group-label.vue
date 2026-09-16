<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface RadioGroupLabelBaseProps extends PolymorphicProps {}
export interface RadioGroupLabelProps
  extends
    RadioGroupLabelBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useRadioGroupContext } from './use-radio-group-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<RadioGroupLabelProps>()
const radioGroup = useRadioGroupContext()

useForwardExpose()
</script>

<template>
  <codesign.span v-bind="radioGroup.getLabelProps()" :as-child="asChild">
    <slot />
  </codesign.span>
</template>
