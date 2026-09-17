<script lang="ts">
  import { useStackTrace } from './stack-trace-context.svelte.ts'

  interface StackTraceCopyButtonProps {
    timeout?: number
    children?: import('svelte').Snippet
  }

  let { timeout = 2000, children, ...rest }: StackTraceCopyButtonProps = $props()
  const { raw } = useStackTrace()

  let isCopied = $state(false)
  let timer: ReturnType<typeof setTimeout> | undefined

  const handleClick = () => {
    navigator.clipboard
      .writeText(raw)
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

<button {...rest} aria-label="Copy stack trace" data-copied={isCopied || undefined} data-scope="stack-trace" data-part="copy-button" onclick={handleClick} type="button">
  {@render children?.()}
</button>
