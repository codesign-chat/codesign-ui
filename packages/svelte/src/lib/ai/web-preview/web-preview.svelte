<script lang="ts">
  import { setContext } from 'svelte'
  import { webPreviewKey } from './web-preview-context.svelte.ts'

  interface WebPreviewProps {
    defaultUrl?: string
    onUrlChange?: (url: string) => void
    children?: import('svelte').Snippet
  }

  let { defaultUrl = '', onUrlChange, children, ...rest }: WebPreviewProps = $props()

  let url = $state(defaultUrl)
  let consoleOpen = $state(false)

  setContext(webPreviewKey, {
    get consoleOpen() {
      return consoleOpen
    },
    setConsoleOpen(next: boolean) {
      consoleOpen = next
    },
    setUrl(next: string) {
      url = next
      onUrlChange?.(next)
    },
    get url() {
      return url
    },
  })
</script>

<div {...rest} data-scope="web-preview" data-part="root">
  {@render children?.()}
</div>
