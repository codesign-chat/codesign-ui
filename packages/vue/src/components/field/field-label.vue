<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface FieldLabelBaseProps extends PolymorphicProps {}
export interface FieldLabelProps
  extends
    FieldLabelBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useFieldContext } from './use-field-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<FieldLabelProps>()
const field = useFieldContext()

useForwardExpose()
</script>

<template>
  <codesign.label v-bind="field.getLabelProps()" :as-child="asChild"><slot /></codesign.label>
</template>
