<script setup lang="ts">
import { Highlight } from '@codesign-ui/vue/highlight'
import styles from 'styles/highlight.module.css'
</script>

<template>
  <p :class="styles.Text">
    <Highlight
      :class="styles.Mark"
      query="@codesign.chat"
      text="Contact us at support@codesign.chat or sales@codesign.chat for assistance."
      match-all
    />
  </p>
</template>
