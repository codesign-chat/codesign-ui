<script lang="ts">
  import { Format } from '@codesign-ui/svelte/format'
  import { LocaleProvider } from '@codesign-ui/svelte/locale'
  import styles from 'styles/format.module.css'
</script>

<LocaleProvider locale="ar-EG">
  <span class={styles.Value}>
    <Format.Time value="13:05" format="12h" />
  </span>
</LocaleProvider>
