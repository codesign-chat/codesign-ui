<script lang="ts">
  import { Accordion } from '@codesign-ui/svelte/accordion'
  import { ChevronDownIcon } from 'lucide-svelte'
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

<Accordion.Root class={styles.Root}>
  {#each items as item (item.value)}
    <Accordion.Item class={styles.Item} value={item.value} disabled={item.value === 'getting-started'}>
      <Accordion.ItemTrigger class={styles.ItemTrigger}>
        {item.title}
        <Accordion.ItemIndicator class={styles.ItemIndicator}>
          <ChevronDownIcon />
        </Accordion.ItemIndicator>
      </Accordion.ItemTrigger>
      <Accordion.ItemContent class={styles.ItemContent}>
        <div class={styles.ItemBody}>{item.content}</div>
      </Accordion.ItemContent>
    </Accordion.Item>
  {/each}
</Accordion.Root>
