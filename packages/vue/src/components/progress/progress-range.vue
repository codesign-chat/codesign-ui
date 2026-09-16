<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ProgressRangeBaseProps extends PolymorphicProps {}
export interface ProgressRangeProps
  extends
    ProgressRangeBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useProgressContext } from './use-progress-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ProgressRangeProps>()
const progress = useProgressContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="progress.getRangeProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
