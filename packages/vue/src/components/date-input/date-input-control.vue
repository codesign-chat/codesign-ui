<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface DateInputControlBaseProps extends PolymorphicProps {}
export interface DateInputControlProps
  extends
    DateInputControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useDateInputContext } from './use-date-input-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<DateInputControlProps>()
const dateInput = useDateInputContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="dateInput.getControlProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
