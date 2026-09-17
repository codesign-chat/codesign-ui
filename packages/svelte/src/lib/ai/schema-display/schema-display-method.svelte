<script lang="ts">
  import { useSchemaDisplay } from './schema-display-context.svelte.ts'

  interface SchemaDisplayMethodProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: SchemaDisplayMethodProps = $props()
  const { method } = useSchemaDisplay()
</script>

<span {...rest} data-method={method} data-scope="schema-display" data-part="method">
  {#if children}
    {@render children()}
  {:else}
    {method}
  {/if}
</span>
