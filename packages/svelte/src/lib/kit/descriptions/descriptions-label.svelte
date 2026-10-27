<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  type Props = HTMLAttributes<HTMLElement> & { children?: import('svelte').Snippet }
  let { children, ...rest }: Props = $props()
</script>

<dt {...rest} data-scope="descriptions" data-part="label">{@render children?.()}</dt>
