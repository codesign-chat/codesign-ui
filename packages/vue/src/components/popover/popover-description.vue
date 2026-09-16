<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface PopoverDescriptionBaseProps extends PolymorphicProps {}
export interface PopoverDescriptionProps
  extends
    PopoverDescriptionBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { usePopoverContext } from './use-popover-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<PopoverDescriptionProps>()
const popover = usePopoverContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="popover.getDescriptionProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
