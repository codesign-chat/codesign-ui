<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ListboxContentBaseProps extends PolymorphicProps {}
export interface ListboxContentProps
  extends
    ListboxContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { codesign } from '../factory.ts'
import { useListboxContext } from './use-listbox-context.ts'

defineProps<ListboxContentProps>()
const listbox = useListboxContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="listbox.getContentProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
