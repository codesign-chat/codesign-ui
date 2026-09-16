<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ClipboardValueTextBaseProps extends PolymorphicProps {}
export interface ClipboardValueTextProps
  extends
    ClipboardValueTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useClipboardContext } from './use-clipboard-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ClipboardValueTextProps>()
const clipboard = useClipboardContext()

useForwardExpose()
</script>

<template>
  <codesign.span :as-child="asChild">
    <slot>{{ clipboard.value }}</slot>
  </codesign.span>
</template>
