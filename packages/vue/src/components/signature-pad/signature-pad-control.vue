<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface SignaturePadControlBaseProps extends PolymorphicProps {}
export interface SignaturePadControlProps
  extends
    SignaturePadControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useSignaturePadContext } from './use-signature-pad-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<SignaturePadControlProps>()
const signaturePad = useSignaturePadContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="signaturePad.getControlProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
