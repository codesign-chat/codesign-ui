<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ProgressTrackBaseProps extends PolymorphicProps {}
export interface ProgressTrackProps
  extends
    ProgressTrackBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useProgressContext } from './use-progress-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ProgressTrackProps>()
const progress = useProgressContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="progress.getTrackProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
