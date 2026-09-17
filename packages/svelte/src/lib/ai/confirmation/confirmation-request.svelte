<script lang="ts">
  import { useConfirmation } from './confirmation-context.svelte.ts'

  interface ConfirmationRequestProps {
    children?: import('svelte').Snippet
  }

  let { children }: ConfirmationRequestProps = $props()
  const { state } = useConfirmation()
</script>

{#if state === 'approval-requested'}
  {@render children?.()}
{/if}
