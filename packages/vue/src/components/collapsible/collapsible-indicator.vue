<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface CollapsibleIndicatorBaseProps extends PolymorphicProps {}
export interface CollapsibleIndicatorProps
  extends
    CollapsibleIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useCollapsibleContext } from './use-collapsible-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<CollapsibleIndicatorProps>()

const collapsible = useCollapsibleContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="collapsible.getIndicatorProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
