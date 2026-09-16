import { Highlight } from '@codesign-ui/solid/highlight'
import styles from 'styles/highlight.module.css'

export const Basic = () => (
  <p class={styles.Text}>
    <Highlight
      class={styles.Mark}
      query="component"
      text="Codesign UI is a headless component library for building accessible web applications."
    />
  </p>
)
