<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ComboboxClearTriggerBaseProps extends PolymorphicProps {}
export interface ComboboxClearTriggerProps
  extends
    ComboboxClearTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useComboboxContext } from './use-combobox-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ComboboxClearTriggerProps>()
const combobox = useComboboxContext()

useForwardExpose()
</script>

<template>
  <codesign.button v-bind="combobox.getClearTriggerProps()" :as-child="asChild">
    <slot />
  </codesign.button>
</template>
