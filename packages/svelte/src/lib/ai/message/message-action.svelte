<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  interface MessageActionProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'onclick'> {
    label?: string
    tooltip?: string
    children?: import('svelte').Snippet
  }

  let { label, tooltip, children, ...rest }: MessageActionProps = $props()
</script>

<button
  {...rest}
  type="button"
  data-scope="message"
  data-part="action"
  aria-label={label ?? tooltip}
>
  {@render children?.()}
</button>
