<script setup lang="ts">
import { Popover } from '@codesign-ui/vue/popover'
</script>

<template>
  <Popover.Root>
    <Popover.Trigger asChild>
      <button>Open Popover</button>
    </Popover.Trigger>
    <Popover.Positioner>
      <Popover.Content>Content</Popover.Content>
    </Popover.Positioner>
  </Popover.Root>
</template>
