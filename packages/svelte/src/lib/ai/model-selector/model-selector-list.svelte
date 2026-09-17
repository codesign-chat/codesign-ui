<script lang="ts">
  import { useModelSelector } from './model-selector-context.svelte.ts'

  interface MSListProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: MSListProps = $props()
  const context = useModelSelector()
</script>

<div {...rest} aria-activedescendant={context.highlightedValue ? 'model-selector-item-' + context.visibleValues.indexOf(context.highlightedValue) : undefined} aria-label="Models" id="model-selector-list" tabindex="0" data-scope="model-selector" data-part="list" role="listbox">
  {@render children?.()}
</div>
