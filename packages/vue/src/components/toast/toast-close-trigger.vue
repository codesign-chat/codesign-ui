<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ToastCloseTriggerBaseProps extends PolymorphicProps {}
export interface ToastCloseTriggerProps
  extends
    ToastCloseTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useToastContext } from './use-toast-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ToastCloseTriggerProps>()
const toast = useToastContext()

useForwardExpose()
</script>

<template>
  <codesign.button v-bind="toast.getCloseTriggerProps()" :as-child="asChild">
    <slot />
  </codesign.button>
</template>
