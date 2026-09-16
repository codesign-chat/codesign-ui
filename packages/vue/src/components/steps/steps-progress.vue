<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface StepsProgressBaseProps extends PolymorphicProps {}
export interface StepsProgressProps
  extends
    StepsProgressBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useStepsContext } from './use-steps-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<StepsProgressProps>()
const steps = useStepsContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="steps.getProgressProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
