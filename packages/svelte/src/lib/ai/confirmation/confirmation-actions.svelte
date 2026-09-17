<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import { useConfirmation } from './confirmation-context.svelte.ts'

  interface ConfirmationActionsProps extends HTMLAttributes<HTMLDivElement> {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: ConfirmationActionsProps = $props()
  const { state } = useConfirmation()
</script>

{#if state === 'approval-requested'}
  <div {...rest} data-scope="confirmation" data-part="actions">
    {@render children?.()}
  </div>
{/if}
