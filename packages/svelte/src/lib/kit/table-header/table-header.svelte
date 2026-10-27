<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  type Props = HTMLAttributes<HTMLTableSectionElement> & { children?: import('svelte').Snippet }
  let { children, ...rest }: Props = $props()
</script>

<thead {...rest} data-scope="table-header" data-part="root">{@render children?.()}</thead>
