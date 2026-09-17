<script lang="ts">
  import { useSnippet } from './snippet-context.svelte.ts'

  interface SnippetCopyButtonProps {
    timeout?: number
    children?: import('svelte').Snippet<[boolean]>
  }

  let { timeout = 2000, children, ...rest }: SnippetCopyButtonProps = $props()
  const { code } = useSnippet()

  let isCopied = $state(false)
  let timer: ReturnType<typeof setTimeout> | undefined

  const handleClick = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        isCopied = true
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => (isCopied = false), timeout)
      })
      .catch(() => {
        // clipboard unavailable
      })
  }
</script>

<button {...rest} aria-label="Copy" data-copied={isCopied || undefined} data-scope="snippet" data-part="copy-button" onclick={handleClick} title="Copy" type="button">
  {@render children?.(isCopied)}
</button>
