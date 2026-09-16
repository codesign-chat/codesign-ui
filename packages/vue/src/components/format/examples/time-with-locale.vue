<script setup lang="ts">
import { Format } from '@codesign-ui/vue/format'
import { LocaleProvider } from '@codesign-ui/vue/locale'
import styles from 'styles/format.module.css'
</script>

<template>
  <LocaleProvider locale="ar-EG">
    <span :class="styles.Value">
      <Format.Time value="13:05" :format="'12h'" />
    </span>
  </LocaleProvider>
</template>
