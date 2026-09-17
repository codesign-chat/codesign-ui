<script lang="ts">
  interface ToolInputProps {
    input: unknown
  }

  let { input, ...rest }: ToolInputProps = $props()
</script>

<div {...rest} data-scope="tool" data-part="input">
  <h4 data-scope="tool" data-part="label">Parameters</h4>
  <pre data-scope="tool" data-part="code">{JSON.stringify(input, null, 2)}</pre>
</div>
