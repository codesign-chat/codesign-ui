<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  interface ConversationEmptyStateProps extends HTMLAttributes<HTMLDivElement> {
    title?: string
    description?: string
    icon?: import('svelte').Snippet
    children?: import('svelte').Snippet
  }

  let { title = 'No messages yet', description = 'Start a conversation to see messages here', icon, children, ...rest }: ConversationEmptyStateProps = $props()
</script>

<div {...rest} data-scope="conversation" data-part="empty-state">
  {#if children}
    {@render children()}
  {:else}
    {#if icon}
      <div data-scope="conversation" data-part="empty-state-icon">{@render icon()}</div>
    {/if}
    <div data-scope="conversation" data-part="empty-state-title">{title}</div>
    <div data-scope="conversation" data-part="empty-state-description">{description}</div>
  {/if}
</div>
