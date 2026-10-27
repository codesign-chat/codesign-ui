<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  type Props = HTMLAttributes<HTMLHeadingElement> & { children?: import('svelte').Snippet }
  let { children, ...rest }: Props = $props()
</script>

<h4 {...rest} data-scope="notification" data-part="title">{@render children?.()}</h4>
