<script lang="ts">
  import { useModelSelector } from './model-selector-context.svelte.ts'

  interface MSInputProps {
    [key: string]: unknown
  }

  let rest: MSInputProps = $props()
  const context = useModelSelector()

  const handleKeydown = (event: KeyboardEvent) => {
    const values = context.visibleValues
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (values.length === 0) return
      const currentIndex = context.highlightedValue ? values.indexOf(context.highlightedValue) : -1
      context.setHighlightedValue(values[(currentIndex + 1 + values.length) % values.length])
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (values.length === 0) return
      const currentIndex = context.highlightedValue ? values.indexOf(context.highlightedValue) : -1
      context.setHighlightedValue(values[(currentIndex - 1 + values.length) % values.length])
    } else if (event.key === 'Enter' && context.highlightedValue) {
      event.preventDefault()
      context.selectValue(context.highlightedValue)
      context.close()
    } else if (event.key === 'Home' && values.length > 0) {
      event.preventDefault()
      context.setHighlightedValue(values[0])
    } else if (event.key === 'End' && values.length > 0) {
      event.preventDefault()
      context.setHighlightedValue(values[values.length - 1])
    }
  }
</script>

<input {...rest} aria-autocomplete="list" aria-controls="model-selector-list" aria-expanded="true" data-scope="model-selector" data-part="input" oninput={(event) => context.setQuery(event.currentTarget.value)} onkeydown={handleKeydown} placeholder="Search models…" role="combobox" type="text" />
