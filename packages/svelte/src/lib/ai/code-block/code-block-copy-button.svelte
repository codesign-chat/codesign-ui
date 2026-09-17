<script lang="ts">
  import { useCodeBlock } from './code-block-context.svelte.ts'

  interface CodeBlockCopyButtonProps {
    timeout?: number
    children?: import('svelte').Snippet<[boolean]>
  }

  let { timeout = 2000, children, ...rest }: CodeBlockCopyButtonProps = $props()
  const { code } = useCodeBlock()

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

<button {...rest} aria-label="Copy" data-copied={isCopied || undefined} data-scope="code-block" data-part="copy-button" onclick={handleClick} type="button">
  {@render children?.(isCopied)}
</button>
