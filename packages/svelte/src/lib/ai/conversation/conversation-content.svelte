<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  interface ConversationContentProps extends HTMLAttributes<HTMLDivElement> {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: ConversationContentProps = $props()
</script>

<div {...rest} data-scope="conversation" data-part="content">
  {@render children?.()}
</div>
