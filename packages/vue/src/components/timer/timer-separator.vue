<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface TimerSeparatorBaseProps extends PolymorphicProps {}
export interface TimerSeparatorProps
  extends
    TimerSeparatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useTimerContext } from './use-timer-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<TimerSeparatorProps>()
const timer = useTimerContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="timer.getSeparatorProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
