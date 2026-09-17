<script lang="ts">
  import { setContext } from 'svelte'
  import { Root as DialogRoot } from '../../components/dialog/index.ts'
  import { matchesQuery, modelSelectorKey, type ModelSelectorEntry } from './model-selector-context.svelte.ts'

  interface ModelSelectorProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: ModelSelectorProps = $props()
  void rest

  let entries = $state<ModelSelectorEntry[]>([])
  let query = $state('')
  let open = $state(false)
  let highlightedValue = $state<string | null>(null)

  const visibleValues = $derived(entries.map((entry) => entry.value).filter((value) => matchesQuery(value, query)))

  setContext(modelSelectorKey, {
    close: () => (open = false),
    get highlightedValue() { return highlightedValue },
    get query() { return query },
    registerItem(entry: ModelSelectorEntry) {
      if (!entries.some((item) => item.value === entry.value)) {
        entries = [...entries, entry]
      }
    },
    selectValue(value: string) {
      entries.find((item) => item.value === value)?.onSelect?.(value)
    },
    setHighlightedValue(value: string | null) {
      highlightedValue = value
    },
    setQuery(nextQuery: string) {
      query = nextQuery
      highlightedValue = entries.map((entry) => entry.value).find((value) => matchesQuery(value, nextQuery)) ?? null
    },
    unregisterItem(value: string) {
      entries = entries.filter((item) => item.value !== value)
    },
    get visibleValues() { return visibleValues },
  })
</script>

<DialogRoot onOpenChange={(details: { open: boolean }) => (open = details.open)} {open}>
  {@render children?.()}
</DialogRoot>
