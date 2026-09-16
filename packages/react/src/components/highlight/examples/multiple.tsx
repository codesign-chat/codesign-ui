import { Highlight } from '@codesign-ui/react/highlight'
import styles from 'styles/highlight.module.css'

export const Multiple = () => (
  <p className={styles.Text}>
    <Highlight
      className={styles.Mark}
      query={['React', 'Vue']}
      text="Codesign UI provides React, Solid, Vue, and Svelte components that are accessible and customizable."
    />
  </p>
)
