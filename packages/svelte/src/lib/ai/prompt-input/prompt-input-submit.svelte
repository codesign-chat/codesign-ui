<script lang="ts">
  interface PromptInputSubmitProps {
    onStop?: () => void
    status?: 'ready' | 'streaming' | 'submitted'
    children?: import('svelte').Snippet
  }

  let { onStop, status, children, ...rest }: PromptInputSubmitProps = $props()

  const isGenerating = $derived(status === 'submitted' || status === 'streaming')

  const handleClick = (event: MouseEvent) => {
    if (isGenerating && onStop) {
      event.preventDefault()
      onStop()
    }
  }
</script>

<button
  {...rest}
  type={isGenerating && onStop ? 'button' : 'submit'}
  aria-label={isGenerating ? 'Stop' : 'Submit'}
  data-scope="prompt-input"
  data-part="submit"
  data-status={status}
  onclick={handleClick}
>
  {@render children?.()}
</button>
