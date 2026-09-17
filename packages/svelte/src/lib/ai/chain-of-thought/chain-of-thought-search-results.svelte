<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  interface ChainOfThoughtSearchResultsProps extends HTMLAttributes<HTMLDivElement> {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: ChainOfThoughtSearchResultsProps = $props()
</script>

<div {...rest} data-scope="chain-of-thought" data-part="search-results">
  {@render children?.()}
</div>
