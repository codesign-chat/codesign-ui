<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface CollapsibleContentBaseProps extends PolymorphicProps {}
export interface CollapsibleContentProps
  extends
    CollapsibleContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useCollapsibleContext } from './use-collapsible-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<CollapsibleContentProps>()
const collapsible = useCollapsibleContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-if="!collapsible.unmounted" v-bind="collapsible.getContentProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
