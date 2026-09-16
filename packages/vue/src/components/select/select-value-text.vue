<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface SelectValueTextBaseProps extends PolymorphicProps {}
export interface SelectValueTextProps
  extends
    SelectValueTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {
  placeholder?: string
}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useSelectContext } from './use-select-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<SelectValueTextProps>()
const select = useSelectContext()
const slots = defineSlots()

useForwardExpose()
</script>

<template>
  <codesign.span v-bind="select.getValueTextProps()" :as-child="asChild">
    <slot>{{ slots.default?.() || select.valueAsString || props.placeholder }}</slot>
  </codesign.span>
</template>
