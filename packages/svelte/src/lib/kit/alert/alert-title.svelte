<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  type Props = HTMLAttributes<HTMLHeadingElement> & { children?: import('svelte').Snippet }
  let { children, ...rest }: Props = $props()
</script>

<h3 {...rest} data-scope="alert" data-part="title">{@render children?.()}</h3>
