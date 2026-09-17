<script lang="ts">
  interface ToolOutputProps {
    errorText?: string
    output?: unknown
  }

  let { errorText, output, ...rest }: ToolOutputProps = $props()

  const rendered = $derived(
    typeof output === 'string' || (typeof output === 'object' && output !== null)
      ? (typeof output === 'string' ? output : JSON.stringify(output, null, 2))
      : null,
  )
</script>

{#if output || errorText}
  <div {...rest} data-scope="tool" data-part="output" data-error={errorText ? '' : undefined}>
    <h4 data-scope="tool" data-part="label">{errorText ? 'Error' : 'Result'}</h4>
    {#if errorText}
      <div data-scope="tool" data-part="error-text">{errorText}</div>
    {/if}
    {#if rendered !== null}
      <pre data-scope="tool" data-part="code">{rendered}</pre>
    {:else if output !== null && output !== undefined}
      <div data-scope="tool" data-part="output-value">{String(output)}</div>
    {/if}
  </div>
{/if}
