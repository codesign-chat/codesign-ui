<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { UseTimerReturn } from './use-timer.ts'

interface RootProviderProps {
  value: UnwrapRef<UseTimerReturn>
}

export interface TimerRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface TimerRootProviderProps
  extends
    TimerRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { codesign } from '../factory.ts'
import { TimerProvider } from './use-timer-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<TimerRootProviderProps>()
const timer = computed(() => props.value)

TimerProvider(timer)
useForwardExpose()
</script>

<template>
  <codesign.div v-bind="timer.getRootProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
