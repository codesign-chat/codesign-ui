<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface PaginationLastTriggerBaseProps extends PolymorphicProps {}
export interface PaginationLastTriggerProps
  extends
    PaginationLastTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { usePaginationContext } from './use-pagination-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<PaginationLastTriggerProps>()
const pagination = usePaginationContext()

useForwardExpose()
</script>

<template>
  <codesign.button v-bind="pagination.getLastTriggerProps()" :as-child="asChild">
    <slot />
  </codesign.button>
</template>
