<script setup lang="ts">
import { QrCode } from '@codesign-ui/vue/qr-code'
import styles from 'styles/qr-code.module.css'

const fills = ['#5417D7', '#EC5D5E']
</script>

<template>
  <div class="hstack">
    <QrCode.Root v-for="fill in fills" :key="fill" :class="styles.Root" defaultValue="http://codesign.chat">
      <QrCode.Frame :class="styles.Frame" :style="{ fill }">
        <QrCode.Pattern :class="styles.Pattern" />
      </QrCode.Frame>
    </QrCode.Root>
  </div>
</template>
