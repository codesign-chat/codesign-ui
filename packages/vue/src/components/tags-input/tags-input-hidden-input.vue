<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface TagsInputHiddenInputBaseProps extends PolymorphicProps {}
export interface TagsInputHiddenInputProps
  extends
    TagsInputHiddenInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useTagsInputContext } from './use-tags-input-context.ts'
import { useFieldContext } from '../field/index.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<TagsInputHiddenInputProps>()

const tagsInput = useTagsInputContext()
const field = useFieldContext()

useForwardExpose()
</script>

<template>
  <codesign.input :aria-describedby="field?.ariaDescribedby" v-bind="tagsInput.getHiddenInputProps()" :as-child="asChild">
    <slot />
  </codesign.input>
</template>
