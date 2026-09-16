<script setup lang="ts">
import { Dialog } from '@codesign-ui/vue/dialog'
import { XIcon } from 'lucide-vue-next'
</script>

<template>
  <Dialog.Root>
    <Dialog.Trigger>Open Dialog</Dialog.Trigger>
    <Teleport to="body">
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Dialog Title</Dialog.Title>
          <Dialog.Description>Dialog Description</Dialog.Description>
          <Dialog.CloseTrigger>
            <XIcon />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.Root>
</template>
