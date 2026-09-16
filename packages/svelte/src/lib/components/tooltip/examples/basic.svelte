<script lang="ts">
  import { Portal } from '@codesign-ui/svelte/portal'
  import { Tooltip } from '@codesign-ui/svelte/tooltip'
  import styles from 'styles/tooltip.module.css'
</script>

<Tooltip.Root>
  <Tooltip.Trigger class={styles.Trigger}>Hover Me</Tooltip.Trigger>
  <Portal>
    <Tooltip.Positioner>
      <Tooltip.Content class={styles.Content}>I am a tooltip!</Tooltip.Content>
    </Tooltip.Positioner>
  </Portal>
</Tooltip.Root>
