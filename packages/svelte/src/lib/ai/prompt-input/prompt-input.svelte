<script lang="ts">
  import { setContext } from 'svelte'
  import { promptInputAttachmentsKey } from './prompt-input-context.svelte.ts'

  interface PromptInputProps {
    accept?: string
    maxFileSize?: number
    maxFiles?: number
    children?: import('svelte').Snippet
  }

  let { accept, maxFileSize, maxFiles, children, ...rest }: PromptInputProps = $props()

  let inputRef: HTMLInputElement | undefined = $state()
  let files = $state<{ filename: string; id: string; mediaType: string; type: 'file'; url: string }[]>([])

  const matchesAccept = (file: File) => {
    if (!accept || accept.trim() === '') return true
    const patterns = accept.split(',').map((s) => s.trim()).filter(Boolean)
    return patterns.some((pattern) =>
      pattern.endsWith('/*') ? file.type.startsWith(pattern.slice(0, -1)) : file.type === pattern,
    )
  }

  const validateFiles = (fileList: File[] | FileList): File[] => {
    const incoming = [...fileList]
    const accepted = incoming.filter(matchesAccept)
    const sized = accepted.filter((file) => (maxFileSize ? file.size <= maxFileSize : true))
    return sized.length > 0 || accepted.length === 0 ? sized : []
  }

  const add = (fileList: File[] | FileList) => {
    const sized = validateFiles(fileList)
    files = [
      ...files,
      ...sized.map((file) => ({
        filename: file.name,
        id: crypto.randomUUID(),
        mediaType: file.type,
        type: 'file' as const,
        url: URL.createObjectURL(file),
      })),
    ]
    if (maxFiles !== undefined && files.length > maxFiles) {
      files = files.slice(0, maxFiles)
    }
  }

  const remove = (id: string) => {
    const found = files.find((file) => file.id === id)
    if (found) URL.revokeObjectURL(found.url)
    files = files.filter((file) => file.id !== id)
  }

  const clear = () => {
    for (const file of files) URL.revokeObjectURL(file.url)
    files = []
  }

  const openFileDialog = () => inputRef?.click()

  $effect(() => () => {
    for (const file of files) URL.revokeObjectURL(file.url)
  })

  setContext(promptInputAttachmentsKey, {
    add,
    clear,
    get files() {
      return files
    },
    openFileDialog,
    remove,
  })

  const onDragOver = (event: DragEvent) => {
    if (event.dataTransfer?.types?.includes('Files')) event.preventDefault()
  }

  const onDrop = (event: DragEvent) => {
    if (event.dataTransfer?.types?.includes('Files')) event.preventDefault()
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) add(event.dataTransfer.files)
  }
</script>

<input
  bind:this={inputRef}
  accept={accept}
  aria-label="Upload files"
  hidden
  multiple
  onchange={(event) => {
    const target = event.currentTarget
    if (target.files) add(target.files)
    target.value = ''
  }}
  type="file"
/>

<div
  {...rest}
  data-scope="prompt-input"
  data-part="root"
  ondragover={onDragOver}
  ondrop={onDrop}
>
  {@render children?.()}
</div>
