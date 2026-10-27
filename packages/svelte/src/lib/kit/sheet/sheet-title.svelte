<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  type Props = HTMLAttributes<HTMLHeadingElement> & { children?: import('svelte').Snippet }
  let { children, ...rest }: Props = $props()
</script>

<h2 {...rest} data-scope="sheet" data-part="title">{@render children?.()}</h2>
