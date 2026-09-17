<script lang="ts">
  import { Trigger as DialogTrigger } from '../../components/dialog/index.ts'

  interface MSTriggerProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: MSTriggerProps = $props()
</script>

<DialogTrigger {...rest} data-scope="model-selector" data-part="trigger">
  {@render children?.()}
</DialogTrigger>
