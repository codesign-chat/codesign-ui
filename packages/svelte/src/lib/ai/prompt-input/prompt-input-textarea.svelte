<script lang="ts">
  import { usePromptInputAttachments } from './prompt-input-context.svelte.ts'

  interface PromptInputTextareaProps {
    placeholder?: string
  }

  let { placeholder = 'What would you like to know?', ...rest }: PromptInputTextareaProps = $props()

  const attachments = usePromptInputAttachments()
  let isComposing = false
  let value = $state('')

  const handleKeyDown = (event: KeyboardEvent) => {
    const target = event.currentTarget as HTMLTextAreaElement
    if (event.key === 'Enter') {
      if (isComposing || event.isComposing || event.shiftKey) return
      event.preventDefault()
      const submitButton = target.form?.querySelector<HTMLButtonElement>('button[type="submit"]')
      if (submitButton?.disabled) return
      target.form?.requestSubmit()
    }
    if (event.key === 'Backspace' && target.value === '' && attachments.files.length > 0) {
      event.preventDefault()
      const last = attachments.files.at(-1)
      if (last) attachments.remove(last.id)
    }
  }

  const handlePaste = (event: ClipboardEvent) => {
    const items = event.clipboardData?.items
    if (!items) return
    const pasted: File[] = []
    for (const item of items) {
      if (item.kind === 'file') {
        const file = item.getAsFile()
        if (file) pasted.push(file)
      }
    }
    if (pasted.length > 0) {
      event.preventDefault()
      attachments.add(pasted)
    }
  }
</script>

<textarea
  {...rest}
  bind:value
  data-scope="prompt-input"
  data-part="textarea"
  name="message"
  oncompositionend={() => (isComposing = false)}
  oncompositionstart={() => (isComposing = true)}
  onkeydown={handleKeyDown}
  onpaste={handlePaste}
  placeholder={placeholder}
></textarea>
