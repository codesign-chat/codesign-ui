<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ProgressLabelBaseProps extends PolymorphicProps {}
export interface ProgressLabelProps
  extends
    ProgressLabelBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useProgressContext } from './use-progress-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ProgressLabelProps>()
const progress = useProgressContext()

useForwardExpose()
</script>

<template>
  <codesign.span v-bind="progress.getLabelProps()" :as-child="asChild">
    <slot />
  </codesign.span>
</template>
