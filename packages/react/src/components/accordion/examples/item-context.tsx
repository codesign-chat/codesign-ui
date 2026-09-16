import { Accordion } from '@codesign-ui/react/accordion'
import styles from 'styles/accordion.module.css'

export const ItemContext = () => {
  return (
    <Accordion.Root className={styles.Root} defaultValue={['codesign-ui']}>
      {items.map((item) => (
        <Accordion.Item className={styles.Item} key={item.value} value={item.value}>
          <Accordion.ItemTrigger className={styles.ItemTrigger}>
            {item.title}
            <Accordion.ItemContext>
              {(context) => (
                <code style={{ display: 'inline-flex', gap: '0.5rem', fontSize: '0.75rem' }}>
                  {context.expanded && <span>Expanded</span>}
                  {context.focused && <span>Focused</span>}
                </code>
              )}
            </Accordion.ItemContext>
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
