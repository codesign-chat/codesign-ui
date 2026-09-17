<script lang="ts">
  import { setContext } from 'svelte'
  import { schemaDisplayKey, type SchemaHttpMethod, type SchemaParameter } from './schema-display-context.svelte.ts'

  interface SchemaDisplayProps {
    description?: string
    method?: SchemaHttpMethod
    parameters?: SchemaParameter[]
    path: string
    children?: import('svelte').Snippet
  }

  let { description, method = 'GET', parameters, path, children, ...rest }: SchemaDisplayProps = $props()

  setContext(schemaDisplayKey, { description, method, parameters, path })
</script>

<div {...rest} data-scope="schema-display" data-part="root">
  {@render children?.()}
</div>
