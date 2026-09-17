<script lang="ts">
  import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from '../../components/collapsible/index.ts'
  import { useWebPreview } from './web-preview-context.svelte.ts'

  export interface WebPreviewLog {
    level: 'error' | 'log' | 'warn'
    message: string
    timestamp: Date
  }

  interface WebPreviewConsoleProps {
    indicator?: import('svelte').Snippet
    logs?: WebPreviewLog[]
    children?: import('svelte').Snippet
  }

  let { indicator, logs = [], children, ...rest }: WebPreviewConsoleProps = $props()
  const { consoleOpen } = useWebPreview()
</script>

<CollapsibleRoot {...rest} data-scope="web-preview" data-part="console" open={consoleOpen}>
  <CollapsibleTrigger data-scope="web-preview" data-part="console-trigger">Console{@render indicator?.()}</CollapsibleTrigger>
  <CollapsibleContent data-scope="web-preview" data-part="console-content">
    <div data-scope="web-preview" data-part="console-logs">
      {#if logs.length === 0}
        <p data-scope="web-preview" data-part="console-empty">No console output</p>
      {:else}
        {#each logs as log (log.timestamp.getTime())}
          <div data-level={log.level} data-scope="web-preview" data-part="console-log">
            <span data-scope="web-preview" data-part="log-time">{log.timestamp.toLocaleTimeString()}</span>
            <span data-scope="web-preview" data-part="log-message">{log.message}</span>
          </div>
        {/each}
      {/if}
      {@render children?.()}
    </div>
  </CollapsibleContent>
</CollapsibleRoot>
