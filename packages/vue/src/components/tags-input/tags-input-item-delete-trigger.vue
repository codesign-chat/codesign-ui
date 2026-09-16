<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface TagsInputItemDeleteTriggerBaseProps extends PolymorphicProps {}
export interface TagsInputItemDeleteTriggerProps
  extends
    TagsInputItemDeleteTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useTagsInputContext } from './use-tags-input-context.ts'
import { useTagsInputItemPropsContext } from './use-tags-input-item-props-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<TagsInputItemDeleteTriggerProps>()
const tagsInput = useTagsInputContext()
const itemProps = useTagsInputItemPropsContext()

useForwardExpose()
</script>

<template>
  <codesign.button v-bind="tagsInput.getItemDeleteTriggerProps(itemProps)" :as-child="asChild">
    <slot />
  </codesign.button>
</template>
