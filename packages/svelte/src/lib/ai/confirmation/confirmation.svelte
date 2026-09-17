<script lang="ts">
  import { setContext } from 'svelte'
  import { confirmationKey, type ConfirmationApproval, type ConfirmationState } from './confirmation-context.svelte.ts'

  interface ConfirmationProps {
    approval?: ConfirmationApproval
    state: ConfirmationState
    children?: import('svelte').Snippet
  }

  let { approval, state, children, ...rest }: ConfirmationProps = $props()

  const visible = Boolean(approval) && state !== 'input-streaming' && state !== 'input-available'

  if (visible) {
    setContext(confirmationKey, { approval, state })
  }
</script>

{#if visible}
  <div {...rest} role="alert" data-scope="confirmation" data-part="root" data-state={state}>
    {@render children?.()}
  </div>
{/if}
