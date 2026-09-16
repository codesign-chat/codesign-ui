import { Highlight } from '@codesign-ui/react/highlight'
import styles from 'styles/highlight.module.css'

export const RepeatingText = () => (
  <p className={styles.Text}>
    <Highlight
      className={styles.Mark}
      query="@codesign.chat"
      text="Contact us at support@codesign.chat or sales@codesign.chat for assistance."
      matchAll
    />
  </p>
)
