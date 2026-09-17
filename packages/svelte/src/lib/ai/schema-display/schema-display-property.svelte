<script lang="ts">
  import Self from './schema-display-property.svelte'
  import type { SchemaProperty } from './schema-display-context.svelte.ts'

  interface SchemaDisplayPropertyProps {
    depth?: number
    property: SchemaProperty
  }

  let { depth = 0, property, ...rest }: SchemaDisplayPropertyProps = $props()
</script>

<div {...rest} data-scope="schema-display" data-part="property" style:margin-left={depth > 0 ? '0.75rem' : undefined}>
  <div data-scope="schema-display" data-part="property-row">
    <span data-scope="schema-display" data-part="property-name">{property.name}</span>
    <span data-scope="schema-display" data-part="property-type">{property.type}</span>
    {#if property.required}
      <span data-scope="schema-display" data-part="property-required">required</span>
    {/if}
  </div>
  {#if property.description}
    <p data-scope="schema-display" data-part="property-description">{property.description}</p>
  {/if}
  {#each property.properties ?? [] as child (child.name)}
    <Self depth={depth + 1} property={child} />
  {/each}
  {#if property.items}
    <Self depth={depth + 1} property={property.items} />
  {/if}
</div>
