<script lang="ts">
  import { setContext } from 'svelte'
  import { snippetKey } from './snippet-context.svelte.ts'

  interface SnippetProps {
    code: string
    children?: import('svelte').Snippet
  }

  let { code, children, ...rest }: SnippetProps = $props()

  setContext(snippetKey, { code })
</script>

<div {...rest} data-scope="snippet" data-part="root">
  {@render children?.()}
</div>
