<script lang="ts">
  import { useSchemaDisplay } from './schema-display-context.svelte.ts'

  interface SchemaDisplayPathProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: SchemaDisplayPathProps = $props()
  const { path } = useSchemaDisplay()
  const segments = $derived(path.split(/(\{[^}]+\})/g))
</script>

<span {...rest} data-scope="schema-display" data-part="path">
  {#if children}
    {@render children()}
  {:else}
    {#each segments as segment (segment)}
      {#if segment.startsWith('{') && segment.endsWith('}')}
        <em data-scope="schema-display" data-part="path-param">{segment}</em>
      {:else}
        {segment}
      {/if}
    {/each}
  {/if}
</span>
