<script lang="ts">
  import { DialogContent, Title as DialogTitle } from '../../components/dialog/index.ts'

  interface MSContentProps {
    title?: string
    children?: import('svelte').Snippet
  }

  let { title = 'Select a model', children }: MSContentProps = $props()
</script>

<div data-scope="model-selector" data-part="positioner">
  <DialogContent data-scope="model-selector" data-part="content">
    <DialogTitle data-scope="model-selector" data-part="title">{title}</DialogTitle>
    {@render children?.()}
  </DialogContent>
</div>
