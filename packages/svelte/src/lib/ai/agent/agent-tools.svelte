<script lang="ts">
  import { AccordionRoot } from '../../components/accordion/index.ts'

  interface AgentToolsProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: AgentToolsProps = $props()
</script>

<div {...rest} data-scope="agent" data-part="tools">
  <span data-scope="agent" data-part="tools-label">Tools</span>
  <AccordionRoot data-scope="agent" data-part="tools-list">
    {@render children?.()}
  </AccordionRoot>
</div>
