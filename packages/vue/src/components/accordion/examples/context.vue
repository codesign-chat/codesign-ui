<script setup lang="ts">
import { Accordion } from '@codesign-ui/vue/accordion'
import { ChevronDownIcon } from 'lucide-vue-next'
import styles from 'styles/accordion.module.css'

const items = [
  {
    value: 'codesign-ui',
    title: 'What is Codesign UI?',
    content: 'A headless component library for building accessible web apps.',
  },
  {
    value: 'getting-started',
    title: 'How to get started?',
    content: 'Install the package and import the components you need.',
  },
  {
    value: 'maintainers',
    title: 'Who maintains this project?',
    content: 'Codesign UI is built on top of Zag.js state machines.',
  },
]
</script>

<template>
  <Accordion.Root :class="styles.Root" :defaultValue="['codesign-ui']">
    <Accordion.Context v-slot="context">
      <output>
        <div>context.value: {{ JSON.stringify(context.value) }}</div>
        <div>context.focusedValue: {{ context.focusedValue || 'null' }}</div>
      </output>
    </Accordion.Context>

    <Accordion.Item v-for="item in items" :key="item.value" :class="styles.Item" :value="item.value">
      <Accordion.ItemTrigger :class="styles.ItemTrigger">
        {{ item.title }}
        <Accordion.ItemIndicator :class="styles.ItemIndicator">
          <ChevronDownIcon />
        </Accordion.ItemIndicator>
      </Accordion.ItemTrigger>
      <Accordion.ItemContent :class="styles.ItemContent">
        <div :class="styles.ItemBody">{{ item.content }}</div>
      </Accordion.ItemContent>
    </Accordion.Item>
  </Accordion.Root>
</template>
