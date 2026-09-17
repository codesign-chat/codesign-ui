<script lang="ts">
  import { CollapsibleTrigger } from '../../components/collapsible/index.ts'

  interface CommitHeaderProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: CommitHeaderProps = $props()
</script>

<CollapsibleTrigger {...rest} data-scope="commit" data-part="header">
  {@render children?.()}
</CollapsibleTrigger>
