<script lang="ts">
  import { useSchemaDisplay } from './schema-display-context.svelte.ts'

  interface SchemaDisplayDescriptionProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: SchemaDisplayDescriptionProps = $props()
  const { description } = useSchemaDisplay()
</script>

{#if children || description}
  <p {...rest} data-scope="schema-display" data-part="description">
    {#if children}
    {@render children()}
  {:else}
    {description}
  {/if}
  </p>
{/if}
