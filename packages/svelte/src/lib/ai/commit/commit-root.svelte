<script lang="ts">
  import { CollapsibleRoot } from '../../components/collapsible/index.ts'

  interface CommitProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: CommitProps = $props()
</script>

<CollapsibleRoot {...rest} data-scope="commit" data-part="root">
  {@render children?.()}
</CollapsibleRoot>
