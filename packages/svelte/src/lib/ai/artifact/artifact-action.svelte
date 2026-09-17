<script lang="ts">
  import { TooltipContent, TooltipPositioner, TooltipRoot, TooltipTrigger } from '../../components/tooltip/index.ts'

  interface ArtifactActionProps {
    label?: string
    tooltip?: string
    children?: import('svelte').Snippet
  }

  let { label, tooltip, children, ...rest }: ArtifactActionProps = $props()
</script>

{#if tooltip}
  <TooltipRoot>
    <TooltipTrigger>
      {#snippet asChild(props)}
        <button {...props()} {...rest} aria-label={label ?? tooltip} type="button" data-scope="artifact" data-part="action">
          {@render children?.()}
        </button>
      {/snippet}
    </TooltipTrigger>
    <TooltipPositioner>
      <TooltipContent data-scope="artifact" data-part="tooltip">{tooltip}</TooltipContent>
    </TooltipPositioner>
  </TooltipRoot>
{:else}
  <button {...rest} aria-label={label ?? tooltip} type="button" data-scope="artifact" data-part="action">
    {@render children?.()}
  </button>
{/if}
