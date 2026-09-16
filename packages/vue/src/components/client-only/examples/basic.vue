<script setup lang="ts">
import { ClientOnly } from '@codesign-ui/vue/client-only'
</script>

<template>
  <ClientOnly>
    <div>This content is only rendered on the client side.</div>
  </ClientOnly>
</template>
