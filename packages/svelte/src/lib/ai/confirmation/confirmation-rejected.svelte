<script lang="ts">
  import { useConfirmation } from './confirmation-context.svelte.ts'

  interface ConfirmationRejectedProps {
    children?: import('svelte').Snippet
  }

  let { children }: ConfirmationRejectedProps = $props()
  const { approval, state } = useConfirmation()
  const visible = approval?.approved === false && (state === 'approval-responded' || state === 'output-denied' || state === 'output-available')
</script>

{#if visible}
  {@render children?.()}
{/if}
