<script lang="ts">
  import { useTerminal } from './terminal-context.svelte.ts'

  interface TerminalCopyButtonProps {
    timeout?: number
    children?: import('svelte').Snippet<[boolean]>
  }

  let { timeout = 2000, children, ...rest }: TerminalCopyButtonProps = $props()
  const { output } = useTerminal()

  let isCopied = $state(false)
  let timer: ReturnType<typeof setTimeout> | undefined

  const handleClick = () => {
    navigator.clipboard
      .writeText(output)
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

<button {...rest} aria-label="Copy" data-copied={isCopied || undefined} data-scope="terminal" data-part="copy-button" onclick={handleClick} type="button">
  {@render children?.(isCopied)}
</button>
