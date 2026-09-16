import { Accordion } from '@codesign-ui/react/accordion'
import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'
import styles from 'styles/accordion.module.css'

export const Controlled = () => {
  const [value, setValue] = useState<string[]>([])

  return (
    <Accordion.Root className={styles.Root} value={value} onValueChange={(details) => setValue(details.value)}>
      {items.map((item) => (
        <Accordion.Item className={styles.Item} key={item.value} value={item.value}>
          <Accordion.ItemTrigger className={styles.ItemTrigger}>
            {item.title}
            <Accordion.ItemIndicator className={styles.ItemIndicator}>
              <ChevronDownIcon />
            </Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent className={styles.ItemContent}>
            <div className={styles.ItemBody}>{item.content}</div>
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
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
