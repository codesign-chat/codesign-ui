<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface TagsInputLabelBaseProps extends PolymorphicProps {}
export interface TagsInputLabelProps
  extends
    TagsInputLabelBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useTagsInputContext } from './use-tags-input-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<TagsInputLabelProps>()
const tagsInput = useTagsInputContext()

useForwardExpose()
</script>

<template>
  <codesign.label v-bind="tagsInput.getLabelProps()" :as-child="asChild">
    <slot />
  </codesign.label>
</template>
