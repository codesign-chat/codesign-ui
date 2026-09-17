<script lang="ts">
  import { useSnippet } from './snippet-context.svelte.ts'

  interface SnippetInputProps {
    [key: string]: unknown
  }

  let rest: SnippetInputProps = $props()
  const { code } = useSnippet()
</script>

<input {...rest} data-scope="snippet" data-part="input" readonly value={code} />
