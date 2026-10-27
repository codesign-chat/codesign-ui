<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  type Props = HTMLAttributes<HTMLTableCellElement> & { children?: import('svelte').Snippet }
  let { children, ...rest }: Props = $props()
</script>

<th {...rest} data-scope="table-header" data-part="cell">{@render children?.()}</th>
