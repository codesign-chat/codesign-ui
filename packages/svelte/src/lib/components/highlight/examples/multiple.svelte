<script lang="ts">
  import { Highlight } from '@codesign-ui/svelte/highlight'
  import styles from 'styles/highlight.module.css'
</script>

<p class={styles.Text}>
  <Highlight
    class={styles.Mark}
    query={['React', 'Vue']}
    text="Codesign UI provides React, Solid, Vue, and Svelte components that are accessible and customizable."
  />
</p>
