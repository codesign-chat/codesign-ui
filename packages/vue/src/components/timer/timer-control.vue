<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface TimerControlBaseProps extends PolymorphicProps {}
export interface TimerControlProps
  extends
    TimerControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useTimerContext } from './use-timer-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<TimerControlProps>()
const timer = useTimerContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="timer.getControlProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
