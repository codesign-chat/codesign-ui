<script lang="ts">
  import { Highlight } from '@codesign-ui/svelte/highlight'
  import styles from 'styles/highlight.module.css'
</script>

<p class={styles.Text}>
  <Highlight
    class={styles.Mark}
    query="@codesign.chat"
    text="Contact us at support@codesign.chat or sales@codesign.chat for assistance."
    matchAll
  />
</p>
