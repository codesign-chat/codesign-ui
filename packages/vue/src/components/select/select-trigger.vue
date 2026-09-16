<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface SelectTriggerBaseProps extends PolymorphicProps {}
export interface SelectTriggerProps
  extends
    SelectTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useSelectContext } from './use-select-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<SelectTriggerProps>()
const select = useSelectContext()

useForwardExpose()
</script>

<template>
  <codesign.button v-bind="select.getTriggerProps()" :as-child="asChild">
    <slot />
  </codesign.button>
</template>
