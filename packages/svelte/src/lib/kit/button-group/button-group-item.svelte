<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  type Props = HTMLAttributes<HTMLButtonElement> & { children?: import('svelte').Snippet }
  let { children, ...rest }: Props = $props()
</script>

<button {...rest} data-scope="button-group" data-part="item">{@render children?.()}</button>
