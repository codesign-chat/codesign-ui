<script setup lang="ts">
import { EnvironmentProvider } from '@codesign-ui/vue/environment'
</script>

<template>
  <iframe title="IFrame Context">
    <EnvironmentProvider><!-- Your App --></EnvironmentProvider>
  </iframe>
</template>
