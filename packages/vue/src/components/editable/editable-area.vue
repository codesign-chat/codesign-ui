<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface EditableAreaBaseProps extends PolymorphicProps {}
export interface EditableAreaProps
  extends
    EditableAreaBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useEditableContext } from './use-editable-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<EditableAreaProps>()
const editable = useEditableContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="editable.getAreaProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
