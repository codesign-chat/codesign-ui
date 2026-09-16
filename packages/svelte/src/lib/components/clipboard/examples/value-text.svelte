<script lang="ts">
  import { Clipboard } from '@codesign-ui/svelte/clipboard'
  import { CheckIcon, ClipboardCopyIcon } from 'lucide-svelte'
  import styles from 'styles/clipboard.module.css'
</script>

<Clipboard.Root class={styles.Root} value="https://codesign.chat">
  <Clipboard.Control class={styles.Control}>
    <Clipboard.ValueText class={styles.ValueText} />
    <Clipboard.Trigger class={styles.Trigger}>
      <Clipboard.Indicator class={styles.Indicator}>
        {#snippet copied()}
          <CheckIcon />
        {/snippet}
        <ClipboardCopyIcon />
      </Clipboard.Indicator>
    </Clipboard.Trigger>
  </Clipboard.Control>
</Clipboard.Root>
