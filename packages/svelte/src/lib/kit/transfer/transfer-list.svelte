<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  type Props = HTMLAttributes<HTMLUListElement> & { children?: import('svelte').Snippet }
  let { children, ...rest }: Props = $props()
</script>

<ul {...rest} data-scope="transfer" data-part="list">{@render children?.()}</ul>
