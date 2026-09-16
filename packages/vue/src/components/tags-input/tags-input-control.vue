<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface TagsInputControlBaseProps extends PolymorphicProps {}
export interface TagsInputControlProps
  extends
    TagsInputControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useTagsInputContext } from './use-tags-input-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<TagsInputControlProps>()
const tagsInput = useTagsInputContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="tagsInput.getControlProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
