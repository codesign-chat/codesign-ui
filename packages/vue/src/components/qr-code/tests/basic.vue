<script setup lang="ts">
import { QrCode, type QrCodeRootEmits, type QrCodeRootProps } from '@codesign-ui/vue/qr-code'
import { useForwardPropsEmits } from '@codesign-ui/vue'

const props = defineProps<QrCodeRootProps>()
const emits = defineEmits<QrCodeRootEmits>()
const localProps = useForwardPropsEmits(props, emits)
</script>

<template>
  <QrCode.Root value="http://codesign.chat" v-bind="localProps">
    <QrCode.Frame>
      <QrCode.Pattern />
    </QrCode.Frame>
    <QrCode.Overlay>
      <img src="https://codesign.chat/icon-192.png" alt="" />
    </QrCode.Overlay>
    <QrCode.DownloadTrigger fileName="qr-code.png" mimeType="image/png">Download</QrCode.DownloadTrigger>
  </QrCode.Root>
</template>
