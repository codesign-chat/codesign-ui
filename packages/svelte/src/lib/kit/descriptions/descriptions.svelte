<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  type Props = HTMLAttributes<HTMLDListElement> & { children?: import('svelte').Snippet }
  let { children, ...rest }: Props = $props()
</script>

<dl {...rest} data-scope="descriptions" data-part="root">{@render children?.()}</dl>
