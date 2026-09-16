<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface PaginationNextTriggerBaseProps extends PolymorphicProps {}
export interface PaginationNextTriggerProps
  extends
    PaginationNextTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { usePaginationContext } from './use-pagination-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<PaginationNextTriggerProps>()
const pagination = usePaginationContext()

useForwardExpose()
</script>

<template>
  <codesign.button v-bind="pagination.getNextTriggerProps()" :as-child="asChild">
    <slot />
  </codesign.button>
</template>
