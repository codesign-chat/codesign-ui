<script lang="ts">
  import { useWebPreview } from './web-preview-context.svelte.ts'

  interface WebPreviewUrlProps {
    placeholder?: string
  }

  let { placeholder = 'Enter URL…', ...rest }: WebPreviewUrlProps = $props()
  const { setUrl } = useWebPreview()

  let inputValue = $state('')

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') setUrl((event.currentTarget as HTMLInputElement).value)
  }
</script>

<input
  {...rest}
  bind:value={inputValue}
  data-scope="web-preview"
  data-part="url"
  onkeydown={handleKeyDown}
  placeholder={placeholder}
/>
