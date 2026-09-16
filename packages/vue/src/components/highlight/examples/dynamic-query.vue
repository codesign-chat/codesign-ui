<script setup lang="ts">
import { Highlight } from '@codesign-ui/vue/highlight'
import { ref } from 'vue'
import field from 'styles/field.module.css'
import styles from 'styles/highlight.module.css'

const query = ref('component')
</script>

<template>
  <div :class="styles.Root">
    <input :class="field.Input" type="text" placeholder="Search text..." v-model="query" />
    <p :class="styles.Text">
      <Highlight
        :class="styles.Mark"
        :query="query"
        text="With Codesign UI, you can build accessible, custom components. Each component is fully typed and works seamlessly with React, Solid, Svelte, and Vue."
      />
    </p>
  </div>
</template>
