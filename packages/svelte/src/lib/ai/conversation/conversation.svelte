<script module lang="ts">
  import { conversationKey, useConversationContext, type ConversationContextValue } from './conversation-context.svelte.ts'

  export { conversationKey, useConversationContext }
  export type { ConversationContextValue }

  interface ConversationProps {
    role?: 'log'
    children?: import('svelte').Snippet
  }
</script>

<script lang="ts">
  const SCROLL_THRESHOLD = 80

  let { role = 'log', children, ...rest }: ConversationProps = $props()

  let scrollRef: HTMLDivElement | undefined = $state()
  let isAtBottom = $state(true)

  const updateIsAtBottom = () => {
    if (!scrollRef) return
    const distance = scrollRef.scrollHeight - scrollRef.scrollTop - scrollRef.clientHeight
    isAtBottom = distance < SCROLL_THRESHOLD
  }

  const scrollToBottom = () => {
    scrollRef?.scrollTo({ top: scrollRef.scrollHeight })
  }

  const scrollToBottomInstant = () => {
    if (scrollRef) scrollRef.scrollTop = scrollRef.scrollHeight
  }

  $effect(() => {
    if (!scrollRef) return
    const observer = new ResizeObserver(() => {
      if (isAtBottom) scrollToBottomInstant()
      updateIsAtBottom()
    })
    const content = scrollRef.querySelector('[data-part="content"]')
    if (content) observer.observe(content)
    return () => observer.disconnect()
  })

  import { setContext } from 'svelte'

  setContext(conversationKey, {
    get isAtBottom() {
      return isAtBottom
    },
    scrollToBottom,
  })
</script>

<div
  bind:this={scrollRef}
  {...rest}
  data-scope="conversation"
  data-part="root"
  onscroll={updateIsAtBottom}
  role={role}
>
  {@render children?.()}
</div>
