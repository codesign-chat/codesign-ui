<script setup lang="ts">
import { QrCode } from '@codesign-ui/vue/qr-code'
import styles from 'styles/qr-code.module.css'
</script>

<template>
  <QrCode.Root :class="styles.Root" defaultValue="http://codesign.chat" :encoding="{ ecc: 'H' }">
    <QrCode.Frame :class="styles.Frame">
      <QrCode.Pattern :class="styles.Pattern" />
    </QrCode.Frame>
    <QrCode.Overlay :class="styles.Overlay">
      <img src="https://codesign.chat/icon-192.png" alt="Codesign UI Logo" />
    </QrCode.Overlay>
  </QrCode.Root>
</template>
