<script lang="ts">
  import { Codesign } from '@codesign-ui/svelte/factory'
</script>

<Codesign as="span">
  {#snippet asChild(props)}
    <a href="#" {...props()}>Codesign UI</a>
  {/snippet}
</Codesign>
