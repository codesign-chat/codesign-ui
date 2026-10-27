<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  type Props = HTMLAttributes<HTMLElement> & { children?: import('svelte').Snippet }
  let { children, ...rest }: Props = $props()
</script>

<nav {...rest} data-scope="breadcrumb" data-part="root">{@render children?.()}</nav>
