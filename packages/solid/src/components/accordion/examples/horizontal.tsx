import { Accordion } from '@codesign-ui/solid/accordion'
import { Index } from 'solid-js'
import styles from 'styles/accordion.module.css'

export const Horizontal = () => {
  return (
    <Accordion.Root class={styles.Root} defaultValue={['codesign-ui']} orientation="horizontal">
      <Index each={items}>
        {(item) => (
          <Accordion.Item class={styles.Item} value={item().value}>
            <Accordion.ItemTrigger class={styles.ItemTrigger}>{item().title}</Accordion.ItemTrigger>
            <Accordion.ItemContent class={styles.ItemContent}>
              <div class={`${styles.ItemBody} ${styles.Centered}`}>{item().content}</div>
            </Accordion.ItemContent>
          </Accordion.Item>
        )}
      </Index>
    </Accordion.Root>
  )
}

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
