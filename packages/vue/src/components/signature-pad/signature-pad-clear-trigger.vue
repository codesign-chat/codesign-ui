<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface SignaturePadClearTriggerBaseProps extends PolymorphicProps {}
export interface SignaturePadClearTriggerProps
  extends
    SignaturePadClearTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useSignaturePadContext } from './use-signature-pad-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<SignaturePadClearTriggerProps>()
const signaturePad = useSignaturePadContext()

useForwardExpose()
</script>

<template>
  <codesign.button v-bind="signaturePad.getClearTriggerProps()" :as-child="asChild">
    <slot />
  </codesign.button>
</template>
