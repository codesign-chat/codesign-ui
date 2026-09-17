<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  interface MessageContentProps extends HTMLAttributes<HTMLDivElement> {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: MessageContentProps = $props()
</script>

<div {...rest} data-scope="message" data-part="content">
  {@render children?.()}
</div>
