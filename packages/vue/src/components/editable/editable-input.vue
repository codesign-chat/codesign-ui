<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface EditableInputBaseProps extends PolymorphicProps {}
export interface EditableInputProps
  extends
    EditableInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useEditableContext } from './use-editable-context.ts'
import { useFieldContext } from '../field/index.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<EditableInputProps>()
const editable = useEditableContext()
const field = useFieldContext()

useForwardExpose()
</script>

<template>
  <codesign.input :aria-describedby="field?.ariaDescribedby" v-bind="editable.getInputProps()" :as-child="asChild">
    <slot />
  </codesign.input>
</template>
