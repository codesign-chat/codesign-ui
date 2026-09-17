<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  interface MessageToolbarProps extends HTMLAttributes<HTMLDivElement> {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: MessageToolbarProps = $props()
</script>

<div {...rest} data-scope="message" data-part="toolbar">
  {@render children?.()}
</div>
