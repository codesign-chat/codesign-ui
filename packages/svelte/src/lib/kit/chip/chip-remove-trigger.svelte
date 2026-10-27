<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  type Props = HTMLAttributes<HTMLButtonElement> & { children?: import('svelte').Snippet }
  let { children, ...rest }: Props = $props()
</script>

<button {...rest} data-scope="chip" data-part="remove">{@render children?.()}</button>
