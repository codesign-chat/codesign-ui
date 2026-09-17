<script lang="ts">
  interface CommitCopyButtonProps {
    hash: string
    timeout?: number
    children?: import('svelte').Snippet<[boolean]>
  }

  let { hash, timeout = 2000, children, ...rest }: CommitCopyButtonProps = $props()

  let isCopied = $state(false)
  let timer: ReturnType<typeof setTimeout> | undefined

  const handleClick = () => {
    navigator.clipboard
      .writeText(hash)
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

<button {...rest} aria-label="Copy hash" data-copied={isCopied || undefined} data-scope="commit" data-part="copy-button" onclick={handleClick} type="button">
  {@render children?.(isCopied)}
</button>
