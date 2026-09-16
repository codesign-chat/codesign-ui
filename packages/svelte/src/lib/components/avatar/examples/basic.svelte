<script lang="ts">
  import { Avatar } from '@codesign-ui/svelte/avatar'
  import styles from 'styles/avatar.module.css'
</script>

<Avatar.Root class={styles.Root}>
  <Avatar.Fallback class={styles.Fallback}>PA</Avatar.Fallback>
  <Avatar.Image class={styles.Image} src="https://i.pravatar.cc/300?u=a" alt="avatar" />
</Avatar.Root>
