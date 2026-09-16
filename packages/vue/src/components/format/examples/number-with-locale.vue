<script setup lang="ts">
import { Format } from '@codesign-ui/vue/format'
import { LocaleProvider } from '@codesign-ui/vue/locale'
import styles from 'styles/format.module.css'
</script>

<template>
  <LocaleProvider locale="de-DE">
    <span :class="styles.Value">
      <Format.Number :value="1450.45" />
    </span>
  </LocaleProvider>
</template>
