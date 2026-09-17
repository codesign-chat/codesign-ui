<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  interface SuggestionProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'onclick'> {
    suggestion: string
    onclick?: (suggestion: string) => void
    children?: import('svelte').Snippet
  }

  let { suggestion, onclick, children, ...rest }: SuggestionProps = $props()
</script>

<button
  {...rest}
  type="button"
  data-scope="suggestion"
  data-part="item"
  onclick={() => onclick?.(suggestion)}
>
  {#if children}
    {@render children()}
  {:else}
    {suggestion}
  {/if}
</button>
