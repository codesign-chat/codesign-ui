<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface SelectItemIndicatorBaseProps extends PolymorphicProps {}
export interface SelectItemIndicatorProps
  extends
    SelectItemIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useSelectContext } from './use-select-context.ts'
import { useSelectItemPropsContext } from './use-select-item-props-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<SelectItemIndicatorProps>()

const select = useSelectContext()
const itemProps = useSelectItemPropsContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="select.getItemIndicatorProps(itemProps)" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
