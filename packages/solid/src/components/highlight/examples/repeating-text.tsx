import { Highlight } from '@codesign-ui/solid/highlight'
import styles from 'styles/highlight.module.css'

export const RepeatingText = () => (
  <p class={styles.Text}>
    <Highlight
      class={styles.Mark}
      query="@codesign.chat"
      text="Contact us at support@codesign.chat or sales@codesign.chat for assistance."
      matchAll
    />
  </p>
)
