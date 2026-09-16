<script lang="ts">
import type { ActionTriggerProps } from '@zag-js/timer'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface TimerActionTriggerBaseProps extends ActionTriggerProps, PolymorphicProps {}
export interface TimerActionTriggerProps
  extends
    TimerActionTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useTimerContext } from './use-timer-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<TimerActionTriggerProps>()
const timer = useTimerContext()

useForwardExpose()
</script>

<template>
  <codesign.button v-bind="timer.getActionTriggerProps(props)" :as-child="asChild">
    <slot />
  </codesign.button>
</template>
