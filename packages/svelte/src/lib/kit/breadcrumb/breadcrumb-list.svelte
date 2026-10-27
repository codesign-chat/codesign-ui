<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  type Props = HTMLAttributes<HTMLOListElement> & { children?: import('svelte').Snippet }
  let { children, ...rest }: Props = $props()
</script>

<ol {...rest} data-scope="breadcrumb" data-part="list">{@render children?.()}</ol>
