<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface EditableCancelTriggerBaseProps extends PolymorphicProps {}
export interface EditableCancelTriggerProps
  extends
    EditableCancelTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useEditableContext } from './use-editable-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<EditableCancelTriggerProps>()
const editable = useEditableContext()

useForwardExpose()
</script>

<template>
  <codesign.button v-bind="editable.getCancelTriggerProps()" :as-child="asChild">
    <slot />
  </codesign.button>
</template>
