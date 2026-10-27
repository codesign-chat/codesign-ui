<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  type Props = HTMLAttributes<HTMLDivElement> & { children?: import('svelte').Snippet }
  let { children, ...rest }: Props = $props()
</script>

<div {...rest} data-scope="transfer" data-part="actions">{@render children?.()}</div>
