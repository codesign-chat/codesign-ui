<script lang="ts">
  import type { SchemaParameter } from './schema-display-context.svelte.ts'

  interface SchemaDisplayParameterProps {
    parameter: SchemaParameter
  }

  let { parameter, ...rest }: SchemaDisplayParameterProps = $props()
</script>

<div {...rest} data-scope="schema-display" data-part="parameter">
  <span data-scope="schema-display" data-part="parameter-name">{parameter.name}</span>
  <span data-scope="schema-display" data-part="parameter-type">{parameter.type}</span>
  {#if parameter.location}
    <span data-scope="schema-display" data-part="parameter-location">{parameter.location}</span>
  {/if}
  {#if parameter.required}
    <span data-scope="schema-display" data-part="parameter-required">required</span>
  {/if}
  {#if parameter.description}
    <span data-scope="schema-display" data-part="parameter-description">{parameter.description}</span>
  {/if}
</div>
