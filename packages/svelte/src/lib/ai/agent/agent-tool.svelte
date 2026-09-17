<script lang="ts">
  import { AccordionItem, AccordionItemTrigger, AccordionItemContent } from '../../components/accordion/index.ts'
  import CodeBlock from '../code-block/code-block.svelte'

  interface AgentToolProps {
    description?: string
    schema: string
    toolName: string
  }

  let { description, schema, toolName, ...rest }: AgentToolProps = $props()
</script>

<AccordionItem {...rest} data-scope="agent" data-part="tool" value={toolName}>
  <AccordionItemTrigger data-scope="agent" data-part="tool-trigger">
    <span data-scope="agent" data-part="tool-name">{toolName}</span>
    <span data-scope="agent" data-part="tool-description">{description ?? 'No description'}</span>
  </AccordionItemTrigger>
  <AccordionItemContent data-scope="agent" data-part="tool-content">
    <div data-scope="agent" data-part="tool-schema">
      <CodeBlock code={schema} language="json" />
    </div>
  </AccordionItemContent>
</AccordionItem>
