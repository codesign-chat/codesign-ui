import { Format } from '@codesign-ui/react/format'
import { LocaleProvider } from '@codesign-ui/react/locale'
import styles from 'styles/format.module.css'

export const TimeWithLocale = () => {
  return (
    <LocaleProvider locale="ar-EG">
      <span className={styles.Value}>
        <Format.Time value="13:05" format="12h" />
      </span>
    </LocaleProvider>
  )
}
