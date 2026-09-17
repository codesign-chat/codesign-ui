<script lang="ts">
  import { CollapsibleTrigger } from '../../components/collapsible/index.ts'

  export type ToolState =
    | 'approval-requested'
    | 'approval-responded'
    | 'input-available'
    | 'input-streaming'
    | 'output-available'
    | 'output-denied'
    | 'output-error'

  const statusLabels: Record<ToolState, string> = {
    'approval-requested': 'Awaiting Approval',
    'approval-responded': 'Responded',
    'input-available': 'Running',
    'input-streaming': 'Pending',
    'output-available': 'Completed',
    'output-denied': 'Denied',
    'output-error': 'Error',
  }

  interface ToolHeaderProps {
    state: ToolState
    title?: string
    toolName?: string
    type: string
    children?: import('svelte').Snippet
  }

  let { state, title, toolName, type, children, ...rest }: ToolHeaderProps = $props()
  const derivedName = type === 'dynamic-tool' ? (toolName ?? '') : type.split('-').slice(1).join('-')
</script>

<CollapsibleTrigger {...rest} data-scope="tool" data-part="trigger">
  <span data-scope="tool" data-part="title">{title ?? derivedName}</span>
  <span data-scope="tool" data-part="status" data-status={state}>{statusLabels[state]}</span>
  {@render children?.()}
</CollapsibleTrigger>
