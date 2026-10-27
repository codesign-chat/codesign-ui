<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements'

  let { ...rest }: HTMLInputAttributes = $props()
</script>

<input {...rest} data-scope="input" data-part="root" />
