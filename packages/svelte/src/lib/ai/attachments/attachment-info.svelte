<script lang="ts">
  import { getAttachmentLabel, useAttachmentContext } from './attachments-context.svelte.ts'

  interface AttachmentInfoProps {
    showMediaType?: boolean
  }

  let { showMediaType = false, ...rest }: AttachmentInfoProps = $props()
  const { data, variant } = useAttachmentContext()
  const label = $derived(getAttachmentLabel(data))
</script>

{#if variant !== 'grid'}
  <div {...rest} data-scope="attachment" data-part="info">
    <span>{label}</span>
    {#if showMediaType && 'mediaType' in data && data.mediaType}
      <span>{data.mediaType}</span>
    {/if}
  </div>
{/if}
