import { Collapsible } from '@codesign-ui/react/collapsible'
import { ChevronRightIcon } from 'lucide-react'
import styles from 'styles/collapsible.module.css'

export const Basic = () => (
  <Collapsible.Root className={styles.Root}>
    <Collapsible.Trigger className={styles.Trigger}>
      What is Codesign UI?
      <Collapsible.Indicator className={styles.Indicator}>
        <ChevronRightIcon />
      </Collapsible.Indicator>
    </Collapsible.Trigger>
    <Collapsible.Content className={styles.Content}>
      <div className={styles.Body}>
        Codesign UI is a headless component library for building accessible, high-quality UI components for React, Solid,
        Vue, and Svelte.
      </div>
    </Collapsible.Content>
  </Collapsible.Root>
)
