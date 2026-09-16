<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface PopoverArrowBaseProps extends PolymorphicProps {}
export interface PopoverArrowProps
  extends
    PopoverArrowBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { usePopoverContext } from './use-popover-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<PopoverArrowProps>()
const popover = usePopoverContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="popover.getArrowProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
