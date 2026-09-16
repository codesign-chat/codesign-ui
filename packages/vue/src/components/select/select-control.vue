<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface SelectControlBaseProps extends PolymorphicProps {}
export interface SelectControlProps
  extends
    SelectControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useSelectContext } from './use-select-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<SelectControlProps>()
const select = useSelectContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="select.getControlProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
