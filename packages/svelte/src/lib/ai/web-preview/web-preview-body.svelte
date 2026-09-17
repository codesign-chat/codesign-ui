<script lang="ts">
  import { useWebPreview } from './web-preview-context.svelte.ts'

  interface WebPreviewBodyProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: WebPreviewBodyProps = $props()
  const { url } = useWebPreview()
</script>

<div data-scope="web-preview" data-part="body">
  <iframe {...rest} data-scope="web-preview" data-part="iframe" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation" src={url || undefined} title="Preview"></iframe>
  {@render children?.()}
</div>
