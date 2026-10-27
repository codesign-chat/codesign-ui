<script lang="ts">
  import type { HTMLTextareaAttributes } from 'svelte/elements'

  let { ...rest }: HTMLTextareaAttributes = $props()
</script>

<textarea {...rest} data-scope="textarea" data-part="root"></textarea>
