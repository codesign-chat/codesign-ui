<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  interface MessageActionsProps extends HTMLAttributes<HTMLDivElement> {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: MessageActionsProps = $props()
</script>

<div {...rest} data-scope="message" data-part="actions">
  {@render children?.()}
</div>
