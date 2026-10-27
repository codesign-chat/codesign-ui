<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements'

  let { ...rest }: HTMLInputAttributes = $props()
</script>

<input {...rest} data-scope="command-palette" data-part="input" />
