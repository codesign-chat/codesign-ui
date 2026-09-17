<script lang="ts">
  import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from '../../components/collapsible/index.ts'

  interface SchemaDisplaySectionProps {
    count?: number
    defaultOpen?: boolean
    label: string
    children?: import('svelte').Snippet
  }

  let { count, defaultOpen = false, label, children, ...rest }: SchemaDisplaySectionProps = $props()
</script>

<CollapsibleRoot {...rest} data-scope="schema-display" data-part="section" defaultOpen={defaultOpen}>
  <CollapsibleTrigger data-scope="schema-display" data-part="section-trigger">
    <span data-scope="schema-display" data-part="section-label">
      {label}
      {#if count !== undefined}
        <span data-scope="schema-display" data-part="section-count">{count}</span>
      {/if}
    </span>
  </CollapsibleTrigger>
  <CollapsibleContent data-scope="schema-display" data-part="section-content">
    <div data-scope="schema-display" data-part="section-body">
      {@render children?.()}
    </div>
  </CollapsibleContent>
</CollapsibleRoot>
