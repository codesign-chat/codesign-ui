<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface StepsNextTriggerBaseProps extends PolymorphicProps {}
export interface StepsNextTriggerProps
  extends
    StepsNextTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useStepsContext } from './use-steps-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<StepsNextTriggerProps>()
const steps = useStepsContext()

useForwardExpose()
</script>

<template>
  <codesign.button v-bind="steps.getNextTriggerProps()" :as-child="asChild">
    <slot />
  </codesign.button>
</template>
