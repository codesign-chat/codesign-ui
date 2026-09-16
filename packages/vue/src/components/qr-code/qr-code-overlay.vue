<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface QrCodeOverlayBaseProps extends PolymorphicProps {}
export interface QrCodeOverlayProps
  extends
    QrCodeOverlayBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useQrCodeContext } from './use-qr-code-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<QrCodeOverlayProps>()
const qrCode = useQrCodeContext()

useForwardExpose()
</script>

<template>
  <codesign.div v-bind="qrCode.getOverlayProps()" :as-child="asChild">
    <slot />
  </codesign.div>
</template>
