<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ClipboardLabelBaseProps extends PolymorphicProps {}
export interface ClipboardLabelProps
  extends
    ClipboardLabelBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useClipboardContext } from './use-clipboard-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ClipboardLabelProps>()
const clipboard = useClipboardContext()

useForwardExpose()
</script>

<template>
  <codesign.label v-bind="clipboard.getLabelProps()" :as-child="asChild">
    <slot />
  </codesign.label>
</template>
