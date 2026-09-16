<script lang="ts">
import type { SVGAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface QrCodePatternBaseProps extends PolymorphicProps {}
export interface QrCodePatternProps
  extends
    QrCodePatternBaseProps,
    /**
     * @vue-ignore
     */
    SVGAttributes {}
</script>

<script setup lang="ts">
import { codesign } from '../factory.ts'
import { useQrCodeContext } from './use-qr-code-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<QrCodePatternProps>()
const qrCode = useQrCodeContext()

useForwardExpose()
</script>

<template>
  <codesign.path v-bind="qrCode.getPatternProps()" :as-child="asChild">
    <slot />
  </codesign.path>
</template>
