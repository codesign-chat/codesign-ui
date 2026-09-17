<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import { useStackTrace } from './stack-trace-context.svelte.ts'

  interface StackTraceActionsProps extends HTMLAttributes<HTMLDivElement> {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: StackTraceActionsProps = $props()
</script>

<div
  {...rest}
  data-scope="stack-trace"
  data-part="actions"
  onclick={(event) => event.stopPropagation()}
  onkeydown={(event) => event.stopPropagation()}
  role="group"
>
  {@render children?.()}
</div>
