<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  type Props = HTMLAttributes<HTMLLIElement> & { children?: import('svelte').Snippet }
  let { children, ...rest }: Props = $props()
</script>

<li {...rest} data-scope="command-palette" data-part="item">{@render children?.()}</li>
