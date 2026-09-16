<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ComboboxItemTextBaseProps extends PolymorphicProps {}
export interface ComboboxItemTextProps
  extends
    ComboboxItemTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useComboboxContext } from './use-combobox-context.ts'
import { useComboboxItemPropsContext } from './use-combobox-item-props-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ComboboxItemTextProps>()
const combobox = useComboboxContext()
const itemProps = useComboboxItemPropsContext()
useForwardExpose()
</script>

<template>
  <codesign.span v-bind="combobox.getItemTextProps(itemProps)" :as-child="asChild">
    <slot />
  </codesign.span>
</template>
