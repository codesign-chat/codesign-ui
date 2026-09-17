<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  interface ChainOfThoughtSearchResultProps extends HTMLAttributes<HTMLSpanElement> {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: ChainOfThoughtSearchResultProps = $props()
</script>

<span {...rest} data-scope="chain-of-thought" data-part="search-result">
  {@render children?.()}
</span>
