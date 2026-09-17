<script lang="ts">
  import { useAttachmentContext } from './attachments-context.svelte.ts'

  interface AttachmentPreviewProps {
    fallbackIcon?: import('svelte').Snippet
    children?: import('svelte').Snippet
  }

  let { fallbackIcon, children, ...rest }: AttachmentPreviewProps = $props()
  const { data, mediaCategory } = useAttachmentContext()
</script>

<div {...rest} data-scope="attachment" data-part="preview">
  {#if children}
    {@render children()}
  {:else if mediaCategory === 'image' && data.type === 'file' && data.url}
    <img alt={data.filename || 'Image'} src={data.url} />
  {:else if mediaCategory === 'video' && data.type === 'file' && data.url}
    <video muted src={data.url}></video>
  {:else}
    {@render fallbackIcon?.()}
  {/if}
</div>
