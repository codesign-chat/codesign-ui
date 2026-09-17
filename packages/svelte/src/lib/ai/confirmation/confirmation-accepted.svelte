<script lang="ts">
  import { useConfirmation } from './confirmation-context.svelte.ts'

  interface ConfirmationAcceptedProps {
    children?: import('svelte').Snippet
  }

  let { children }: ConfirmationAcceptedProps = $props()
  const { approval, state } = useConfirmation()
  const visible = Boolean(approval?.approved) && (state === 'approval-responded' || state === 'output-denied' || state === 'output-available')
</script>

{#if visible}
  {@render children?.()}
{/if}
