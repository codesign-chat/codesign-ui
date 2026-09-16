<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface SignaturePadGuideBaseProps extends PolymorphicProps {}
export interface SignaturePadGuideProps
  extends
    SignaturePadGuideBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useSignaturePadContext } from './use-signature-pad-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<SignaturePadGuideProps>()
const signaturePad = useSignaturePadContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="signaturePad.getGuideProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
