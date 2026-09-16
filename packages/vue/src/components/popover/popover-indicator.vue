<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface PopoverIndicatorBaseProps extends PolymorphicProps {}
export interface PopoverIndicatorProps
  extends
    PopoverIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { usePopoverContext } from './use-popover-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<PopoverIndicatorProps>()
const popover = usePopoverContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="popover.getIndicatorProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
