<script lang="ts">
  interface AgentInstructionsProps {
    children: string
  }

  let { children, ...rest }: AgentInstructionsProps = $props()
</script>

<div {...rest} data-scope="agent" data-part="instructions">
  <span data-scope="agent" data-part="instructions-label">Instructions</span>
  <p data-scope="agent" data-part="instructions-body">{children}</p>
</div>
