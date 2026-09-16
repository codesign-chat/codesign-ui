<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ListboxValueTextBaseProps extends PolymorphicProps {}
export interface ListboxValueTextProps
  extends
    ListboxValueTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {
  placeholder?: string
}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useListboxContext } from './use-listbox-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<ListboxValueTextProps>()
const listbox = useListboxContext()
const slots = defineSlots()

useForwardExpose()
</script>

<template>
  <codesign.span v-bind="listbox.getValueTextProps()" :as-child="asChild">
    <slot>{{ slots.default?.() || listbox.valueAsString || props.placeholder }}</slot>
  </codesign.span>
</template>
