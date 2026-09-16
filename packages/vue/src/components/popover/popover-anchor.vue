<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface PopoverAnchorBaseProps extends PolymorphicProps {}
export interface PopoverAnchorProps
  extends
    PopoverAnchorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { usePopoverContext } from './use-popover-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<PopoverAnchorProps>()
const popover = usePopoverContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="popover.getAnchorProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
