<script lang="ts">
  import { setContext } from 'svelte'
  import { attachmentKey, getMediaCategory, useAttachmentsContext, type AttachmentData } from './attachments-context.svelte.ts'

  interface AttachmentProps {
    data: AttachmentData
    onRemove?: () => void
    children?: import('svelte').Snippet
  }

  let { data, onRemove, children, ...rest }: AttachmentProps = $props()
  const { variant } = useAttachmentsContext()
  const mediaCategory = $derived(getMediaCategory(data))

  setContext(attachmentKey, { get data() { return data }, get mediaCategory() { return mediaCategory }, onRemove, variant })
</script>

<div {...rest} data-category={mediaCategory} data-scope="attachment" data-part="item" data-variant={variant}>
  {@render children?.()}
</div>
