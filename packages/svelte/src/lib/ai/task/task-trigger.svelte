<script lang="ts">
  import { CollapsibleTrigger } from '../../components/collapsible/index.ts'

  interface TaskTriggerProps {
    title: string
    children?: import('svelte').Snippet
  }

  let { title, children, ...rest }: TaskTriggerProps = $props()
</script>

<CollapsibleTrigger {...rest} data-scope="task" data-part="trigger">
  {#snippet asChild(props)}
    <div {...props()}>
      <p>
        {#if children}
          {@render children()}
        {:else}
          {title}
        {/if}
      </p>
    </div>
  {/snippet}
</CollapsibleTrigger>
