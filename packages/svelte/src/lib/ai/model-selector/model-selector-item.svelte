<script lang="ts">
  import { useModelSelector } from './model-selector-context.svelte.ts'

  interface MSItemProps {
    onSelect?: (value: string) => void
    value: string
    children?: import('svelte').Snippet
  }

  let { onSelect, value, children, ...rest }: MSItemProps = $props()
  const context = useModelSelector()

  $effect(() => {
    context.registerItem({ id: 'sr', onSelect, value })
  })

  const visible = $derived(context.visibleValues.includes(value))
  const highlighted = $derived(context.highlightedValue === value)
</script>

{#if visible}
  <div
    {...rest}
    aria-label={value}
    aria-selected={highlighted}
    data-highlighted={highlighted}
    data-scope="model-selector"
    data-part="item"
    data-value={value}
    id={'model-selector-item-' + context.visibleValues.indexOf(value)}
    onclick={() => {
      context.selectValue(value)
      context.close()
    }}
    onmouseenter={() => context.setHighlightedValue(value)}
    role="option"
    tabindex="-1"
  >
    {@render children?.()}
  </div>
{/if}
