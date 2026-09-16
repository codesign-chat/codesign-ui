<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ComboboxControlBaseProps extends PolymorphicProps {}
export interface ComboboxControlProps
  extends
    ComboboxControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useComboboxContext } from './use-combobox-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ComboboxControlProps>()
const combobox = useComboboxContext()
useForwardExpose()
</script>

<template>
  <codesign.div v-bind="combobox.getControlProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
