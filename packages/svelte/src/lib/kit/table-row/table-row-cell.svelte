<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  type Props = HTMLAttributes<HTMLTableCellElement> & { children?: import('svelte').Snippet }
  let { children, ...rest }: Props = $props()
</script>

<td {...rest} data-scope="table-row" data-part="cell">{@render children?.()}</td>
