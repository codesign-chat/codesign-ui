<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface PaginationFirstTriggerBaseProps extends PolymorphicProps {}
export interface PaginationFirstTriggerProps
  extends
    PaginationFirstTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { usePaginationContext } from './use-pagination-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<PaginationFirstTriggerProps>()
const pagination = usePaginationContext()

useForwardExpose()
</script>

<template>
  <codesign.button v-bind="pagination.getFirstTriggerProps()" :as-child="asChild">
    <slot />
  </codesign.button>
</template>
