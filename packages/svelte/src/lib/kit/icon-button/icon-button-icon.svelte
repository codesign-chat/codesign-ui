<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  type Props = HTMLAttributes<HTMLSpanElement> & { children?: import('svelte').Snippet }
  let { children, ...rest }: Props = $props()
</script>

<span {...rest} data-scope="icon-button" data-part="icon">{@render children?.()}</span>
