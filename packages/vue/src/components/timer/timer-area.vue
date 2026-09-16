<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface TimerAreaBaseProps extends PolymorphicProps {}
export interface TimerAreaProps
  extends
    TimerAreaBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useTimerContext } from './use-timer-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<TimerAreaProps>()
const timer = useTimerContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="timer.getAreaProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
