<script lang="ts">
  interface ChainOfThoughtStepProps {
    description?: string
    icon?: import('svelte').Snippet
    label: string
    status?: 'active' | 'complete' | 'pending'
    children?: import('svelte').Snippet
  }

  let { description, icon, label, status = 'complete', children, ...rest }: ChainOfThoughtStepProps = $props()
</script>

<div {...rest} data-scope="chain-of-thought" data-part="step" data-status={status}>
  <div data-scope="chain-of-thought" data-part="step-marker">
    {@render icon?.()}
  </div>
  <div data-scope="chain-of-thought" data-part="step-body">
    <div data-scope="chain-of-thought" data-part="step-label">{label}</div>
    {#if description}
      <div data-scope="chain-of-thought" data-part="step-description">{description}</div>
    {/if}
    {@render children?.()}
  </div>
</div>
