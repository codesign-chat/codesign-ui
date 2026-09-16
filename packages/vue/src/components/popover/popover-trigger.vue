<script lang="ts">
import type { TriggerProps } from '@zag-js/popover'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface PopoverTriggerBaseProps extends TriggerProps, PolymorphicProps {}
export interface PopoverTriggerProps
  extends
    PopoverTriggerBaseProps,
    /**
     * @vue-ignore
     */
    Omit<ButtonHTMLAttributes, 'value'> {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { usePopoverContext } from './use-popover-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<PopoverTriggerProps>()
const popover = usePopoverContext()

useForwardExpose()
</script>

<template>
  <codesign.button v-bind="popover.getTriggerProps(props)" :as-child="asChild">
    <slot />
  </codesign.button>
</template>
