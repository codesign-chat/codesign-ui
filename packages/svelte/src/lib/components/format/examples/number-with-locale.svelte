<script lang="ts">
  import { Format } from '@codesign-ui/svelte/format'
  import { LocaleProvider } from '@codesign-ui/svelte/locale'
  import styles from 'styles/format.module.css'
</script>

<LocaleProvider locale="de-DE">
  <span class={styles.Value}>
    <Format.Number value={1450.45} />
  </span>
</LocaleProvider>
