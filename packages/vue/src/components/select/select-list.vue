<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface SelectListBaseProps extends PolymorphicProps {}
export interface SelectListProps
  extends
    SelectListBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useSelectContext } from './use-select-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<SelectListProps>()
const select = useSelectContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="select.getListProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
