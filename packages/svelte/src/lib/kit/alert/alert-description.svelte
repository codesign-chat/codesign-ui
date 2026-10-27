<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  type Props = HTMLAttributes<HTMLParagraphElement> & { children?: import('svelte').Snippet }
  let { children, ...rest }: Props = $props()
</script>

<p {...rest} data-scope="alert" data-part="description">{@render children?.()}</p>
