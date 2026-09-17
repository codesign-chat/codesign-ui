<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  interface TaskItemFileProps extends HTMLAttributes<HTMLDivElement> {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: TaskItemFileProps = $props()
</script>

<div {...rest} data-scope="task" data-part="item-file">
  {@render children?.()}
</div>
