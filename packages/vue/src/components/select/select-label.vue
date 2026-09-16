<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface SelectLabelBaseProps extends PolymorphicProps {}
export interface SelectLabelProps
  extends
    SelectLabelBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useSelectContext } from './use-select-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<SelectLabelProps>()
const select = useSelectContext()

useForwardExpose()
</script>

<template>
  <codesign.label v-bind="select.getLabelProps()" :as-child="asChild">
    <slot />
  </codesign.label>
</template>
