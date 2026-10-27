<script lang="ts">
  import type { HTMLAnchorAttributes } from 'svelte/elements'

  type Props = HTMLAnchorAttributes & { children?: import('svelte').Snippet }
  let { children, ...rest }: Props = $props()
</script>

<a {...rest} data-scope="nav-item" data-part="root">{@render children?.()}</a>
