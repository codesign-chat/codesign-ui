<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements'

  let { ...rest }: HTMLInputAttributes = $props()
</script>

<input {...rest} data-scope="masked-input" data-part="root" />
