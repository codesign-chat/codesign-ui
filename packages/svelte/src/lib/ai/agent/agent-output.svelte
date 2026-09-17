<script lang="ts">
  import CodeBlock from '../code-block/code-block.svelte'

  interface AgentOutputProps {
    schema: string
    children?: import('svelte').Snippet
  }

  let { schema, children, ...rest }: AgentOutputProps = $props()
</script>

<div {...rest} data-scope="agent" data-part="output">
  <span data-scope="agent" data-part="output-label">Output Schema</span>
  <div data-scope="agent" data-part="output-schema">
    <CodeBlock code={schema} language="typescript" />
  </div>
  {@render children?.()}
</div>
