<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface RadioGroupItemHiddenInputBaseProps extends PolymorphicProps {}
export interface RadioGroupItemHiddenInputProps
  extends
    RadioGroupItemHiddenInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useRadioGroupContext } from './use-radio-group-context.ts'
import { useRadioGroupItemPropsContext } from './use-radio-group-item-props-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<RadioGroupItemHiddenInputProps>()

const radioGroup = useRadioGroupContext()
const itemProps = useRadioGroupItemPropsContext()

useForwardExpose()
</script>

<template>
  <codesign.input v-bind="radioGroup.getItemHiddenInputProps(itemProps)" :as-child="asChild">
    <slot />
  </codesign.input>
</template>
