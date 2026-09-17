<script lang="ts">
  interface AttachmentEmptyProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: AttachmentEmptyProps = $props()
</script>

<div {...rest} data-scope="attachment" data-part="empty">
  {#if children}
    {@render children()}
  {:else}
    No attachments
  {/if}
</div>
