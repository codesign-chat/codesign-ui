<script lang="ts">
  import { useEnvironmentVariable } from './environment-variables-context.svelte.ts'

  interface EnvironmentVariableCopyButtonProps {
    copyFormat?: 'export' | 'name' | 'value'
    timeout?: number
    children?: import('svelte').Snippet<[boolean]>
  }

  let { copyFormat = 'value', timeout = 2000, children, ...rest }: EnvironmentVariableCopyButtonProps = $props()
  const { name, value } = useEnvironmentVariable()

  let isCopied = $state(false)
  let timer: ReturnType<typeof setTimeout> | undefined

  const handleClick = () => {
    const text = copyFormat === 'export' ? `export ${name}="${value}"` : copyFormat === 'name' ? name : value
    navigator.clipboard
      .writeText(text)
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

<button {...rest} aria-label="Copy" data-copied={isCopied || undefined} data-scope="env-vars" data-part="copy-button" onclick={handleClick} type="button">
  {@render children?.(isCopied)}
</button>
