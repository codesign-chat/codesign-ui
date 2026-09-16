<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface StepsTriggerBaseProps extends PolymorphicProps {}
export interface StepsTriggerProps
  extends
    StepsTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useStepsContext } from './use-steps-context.ts'
import { useStepsItemPropsContext } from './use-steps-item-props-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<StepsTriggerProps>()

const steps = useStepsContext()
const itemProps = useStepsItemPropsContext()

useForwardExpose()
</script>

<template>
  <codesign.button v-bind="steps.getTriggerProps(itemProps)" :as-child="asChild">
    <slot />
  </codesign.button>
</template>
