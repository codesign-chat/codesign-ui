<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  interface TaskItemProps extends HTMLAttributes<HTMLDivElement> {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: TaskItemProps = $props()
</script>

<div {...rest} data-scope="task" data-part="item">
  {@render children?.()}
</div>
