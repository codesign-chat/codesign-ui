<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface PopoverCloseTriggerBaseProps extends PolymorphicProps {}
export interface PopoverCloseTriggerProps
  extends
    PopoverCloseTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { usePopoverContext } from './use-popover-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<PopoverCloseTriggerProps>()
const popover = usePopoverContext()

useForwardExpose()
</script>

<template>
  <codesign.button v-bind="popover.getCloseTriggerProps()" :as-child="asChild">
    <slot />
  </codesign.button>
</template>
