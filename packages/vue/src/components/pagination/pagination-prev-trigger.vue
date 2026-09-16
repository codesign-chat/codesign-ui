<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface PaginationPrevTriggerBaseProps extends PolymorphicProps {}
export interface PaginationPrevTriggerProps
  extends
    PaginationPrevTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { usePaginationContext } from './use-pagination-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<PaginationPrevTriggerProps>()
const pagination = usePaginationContext()

useForwardExpose()
</script>

<template>
  <codesign.button v-bind="pagination.getPrevTriggerProps()" :as-child="asChild">
    <slot />
  </codesign.button>
</template>
