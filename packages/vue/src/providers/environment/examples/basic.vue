<script setup lang="ts">
import { EnvironmentProvider } from '@codesign-ui/vue/environment'
import Usage from './usage.vue'
</script>

<template>
  <EnvironmentProvider>
    <Usage />
  </EnvironmentProvider>
</template>
