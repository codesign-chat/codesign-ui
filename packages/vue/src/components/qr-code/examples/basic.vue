<script setup lang="ts">
import { QrCode } from '@codesign-ui/vue/qr-code'
import styles from 'styles/qr-code.module.css'
</script>

<template>
  <QrCode.Root :class="styles.Root" defaultValue="http://codesign.chat">
    <QrCode.Frame :class="styles.Frame">
      <QrCode.Pattern :class="styles.Pattern" />
    </QrCode.Frame>
  </QrCode.Root>
</template>
