<script lang="ts">
  import { useAttachmentContext } from './attachments-context.svelte.ts'

  interface AttachmentRemoveProps {
    label?: string
    children?: import('svelte').Snippet
  }

  let { label = 'Remove', children, ...rest }: AttachmentRemoveProps = $props()
  const { onRemove } = useAttachmentContext()

  const handleClick = (event: MouseEvent) => {
    event.stopPropagation()
    onRemove?.()
  }
</script>

{#if onRemove}
  <button {...rest} aria-label={label} data-scope="attachment" data-part="remove" onclick={handleClick} type="button">
    {@render children?.()}
  </button>
{/if}
