<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  interface SuggestionsProps extends HTMLAttributes<HTMLDivElement> {}

  let { ...rest }: SuggestionsProps = $props()
</script>

<div {...rest} data-scope="suggestion" data-part="list"></div>
