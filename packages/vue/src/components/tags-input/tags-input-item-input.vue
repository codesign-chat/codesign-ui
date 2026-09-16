<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface TagsInputItemInputBaseProps extends PolymorphicProps {}
export interface TagsInputItemInputProps
  extends
    TagsInputItemInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useTagsInputContext } from './use-tags-input-context.ts'
import { useTagsInputItemPropsContext } from './use-tags-input-item-props-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<TagsInputItemInputProps>()

const tagsInput = useTagsInputContext()
const itemProps = useTagsInputItemPropsContext()

useForwardExpose()
</script>

<template>
  <codesign.input v-bind="tagsInput.getItemInputProps(itemProps)" :as-child="asChild">
    <slot />
  </codesign.input>
</template>
