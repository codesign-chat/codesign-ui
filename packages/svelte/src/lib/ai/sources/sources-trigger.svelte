<script lang="ts">
  import { CollapsibleTrigger } from '../../components/collapsible/index.ts'

  interface SourcesTriggerProps {
    count: number
    children?: import('svelte').Snippet
  }

  let { count, children, ...rest }: SourcesTriggerProps = $props()
</script>

<CollapsibleTrigger {...rest} data-scope="sources" data-part="trigger">
  {#if children}
    {@render children()}
  {:else}
    <p data-scope="sources" data-part="count">Used {count} sources</p>
  {/if}
</CollapsibleTrigger>
