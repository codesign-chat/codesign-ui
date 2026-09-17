<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  interface MessageProps extends HTMLAttributes<HTMLDivElement> {
    from: 'assistant' | 'system' | 'user'
    children?: import('svelte').Snippet
  }

  let { from, children, ...rest }: MessageProps = $props()
</script>

<div {...rest} data-scope="message" data-part="root" data-role={from}>
  {@render children?.()}
</div>
