<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ClipboardTriggerBaseProps extends PolymorphicProps {}
export interface ClipboardTriggerProps
  extends
    ClipboardTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useClipboardContext } from './use-clipboard-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ClipboardTriggerProps>()
const clipboard = useClipboardContext()

useForwardExpose()
</script>

<template>
  <codesign.button v-bind="clipboard.getTriggerProps()" :as-child="asChild">
    <slot />
  </codesign.button>
</template>
