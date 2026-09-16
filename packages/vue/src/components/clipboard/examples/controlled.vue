<script setup lang="ts">
import { Clipboard } from '@codesign-ui/vue/clipboard'
import { CheckIcon, ClipboardCopyIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/clipboard.module.css'

const url = ref('https://codesign.chat')
</script>

<template>
  <div class="stack">
    <Clipboard.Root :class="styles.Root" v-model="url">
      <Clipboard.Label :class="styles.Label">Copy this link</Clipboard.Label>
      <Clipboard.Control :class="styles.Control">
        <Clipboard.Input :class="styles.Input" />
        <Clipboard.Trigger :class="styles.Trigger">
          <Clipboard.Indicator :class="styles.Indicator">
            <ClipboardCopyIcon />
            <template #copied>
              <CheckIcon />
            </template>
          </Clipboard.Indicator>
        </Clipboard.Trigger>
      </Clipboard.Control>
    </Clipboard.Root>

    <button :class="button.Root" @click="url = 'https://chakra-ui.com'">Change Url</button>
  </div>
</template>
