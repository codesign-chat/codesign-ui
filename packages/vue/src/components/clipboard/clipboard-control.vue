<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ClipboardControlBaseProps extends PolymorphicProps {}
export interface ClipboardControlProps
  extends
    ClipboardControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useClipboardContext } from './use-clipboard-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ClipboardControlProps>()
const clipboard = useClipboardContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="clipboard.getControlProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
