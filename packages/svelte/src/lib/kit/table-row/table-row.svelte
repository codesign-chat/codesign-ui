<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  type Props = HTMLAttributes<HTMLTableRowElement> & { children?: import('svelte').Snippet }
  let { children, ...rest }: Props = $props()
</script>

<tr {...rest} data-scope="table-row" data-part="root">{@render children?.()}</tr>
