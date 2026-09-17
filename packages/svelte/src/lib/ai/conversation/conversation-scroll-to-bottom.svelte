<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import { useConversationContext } from './conversation-context.svelte.ts'

  interface ConversationScrollToBottomProps extends HTMLAttributes<HTMLButtonElement> {}

  let { ...rest }: ConversationScrollToBottomProps = $props()

  const context = useConversationContext()
</script>

<button
  {...rest}
  type="button"
  data-scope="conversation"
  data-part="scroll-to-bottom"
  data-state={context.isAtBottom ? 'at-bottom' : 'detached'}
  onclick={() => context.scrollToBottom()}
></button>
