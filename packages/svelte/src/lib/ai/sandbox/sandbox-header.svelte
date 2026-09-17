<script lang="ts">
  import { CollapsibleTrigger } from '../../components/collapsible/index.ts'

  interface SandboxHeaderProps {
    indicator?: import('svelte').Snippet
    state?: 'input-streaming' | 'input-available' | 'output-available' | 'output-error'
    title?: import('svelte').Snippet
    children?: import('svelte').Snippet
  }

  let { indicator, state, title, children, ...rest }: SandboxHeaderProps = $props()

  const statusText = $derived(
    state === 'output-error' ? 'Error' : state === 'output-available' ? 'Done' : 'Running',
  )
</script>

<CollapsibleTrigger {...rest} data-scope="sandbox" data-part="header">
  {#if children}
    {@render children()}
  {:else}
    <span data-scope="sandbox" data-part="header-identity">
      <span data-scope="sandbox" data-part="title">{@render title?.()}</span>
      {#if state}
        <span data-scope="sandbox" data-part="status" data-state={state}>{statusText}</span>
      {/if}
      {@render indicator?.()}
    </span>
  {/if}
</CollapsibleTrigger>
