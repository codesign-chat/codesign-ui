<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  interface ConfirmationActionProps extends HTMLAttributes<HTMLButtonElement> {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: ConfirmationActionProps = $props()
</script>

<button {...rest} type="button" data-scope="confirmation" data-part="action">
  {@render children?.()}
</button>
