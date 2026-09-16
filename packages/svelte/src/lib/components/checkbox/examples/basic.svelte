<script lang="ts">
  import { Checkbox } from '@codesign-ui/svelte/checkbox'
  import { CheckIcon } from 'lucide-svelte'
  import styles from 'styles/checkbox.module.css'
</script>

<Checkbox.Root class={styles.Root}>
  <Checkbox.Control class={styles.Control}>
    <Checkbox.Indicator class={styles.Indicator}>
      <CheckIcon />
    </Checkbox.Indicator>
  </Checkbox.Control>
  <Checkbox.Label class={styles.Label}>Checkbox</Checkbox.Label>
  <Checkbox.HiddenInput />
</Checkbox.Root>
