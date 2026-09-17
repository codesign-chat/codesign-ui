<script lang="ts">
  import { TooltipContent, TooltipPositioner, TooltipRoot, TooltipTrigger } from '../../components/tooltip/index.ts'

  interface PromptInputButtonProps {
    tooltip?: string
    children?: import('svelte').Snippet
  }

  let { tooltip, children, ...rest }: PromptInputButtonProps = $props()
</script>

{#if tooltip}
  <TooltipRoot>
    <TooltipTrigger>
      {#snippet asChild(props)}
        <button {...props()} {...rest} type="button" data-scope="prompt-input" data-part="button">
          {@render children?.()}
        </button>
      {/snippet}
    </TooltipTrigger>
    <TooltipPositioner>
      <TooltipContent data-scope="prompt-input" data-part="button-tooltip">{tooltip}</TooltipContent>
    </TooltipPositioner>
  </TooltipRoot>
{:else}
  <button {...rest} type="button" data-scope="prompt-input" data-part="button">
    {@render children?.()}
  </button>
{/if}
