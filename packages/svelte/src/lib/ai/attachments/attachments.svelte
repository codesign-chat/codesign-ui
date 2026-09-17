<script lang="ts">
  import { setContext } from 'svelte'
  import { attachmentsKey, type AttachmentVariant } from './attachments-context.svelte.ts'

  interface AttachmentsProps {
    variant?: AttachmentVariant
    children?: import('svelte').Snippet
  }

  let { variant = 'grid', children, ...rest }: AttachmentsProps = $props()

  setContext(attachmentsKey, { variant })
</script>

<div {...rest} data-scope="attachment" data-part="root" data-variant={variant}>
  {@render children?.()}
</div>
