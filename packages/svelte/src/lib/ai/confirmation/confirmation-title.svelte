<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  interface ConfirmationTitleProps extends HTMLAttributes<HTMLDivElement> {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: ConfirmationTitleProps = $props()
</script>

<div {...rest} data-scope="confirmation" data-part="title">
  {@render children?.()}
</div>
