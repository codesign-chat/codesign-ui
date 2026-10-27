<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  type Props = HTMLAttributes<HTMLElement> & { children?: import('svelte').Snippet }
  let { children, ...rest }: Props = $props()
</script>

<strong {...rest} data-scope="kpi" data-part="value">{@render children?.()}</strong>
