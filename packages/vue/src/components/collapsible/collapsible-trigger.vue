<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface CollapsibleTriggerBaseProps extends PolymorphicProps {}
export interface CollapsibleTriggerProps
  extends
    CollapsibleTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useCollapsibleContext } from './use-collapsible-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<CollapsibleTriggerProps>()
const collapsible = useCollapsibleContext()

useForwardExpose()
</script>

<template>
  <codesign.button v-bind="collapsible.getTriggerProps()" :as-child="asChild">
    <slot />
  </codesign.button>
</template>
