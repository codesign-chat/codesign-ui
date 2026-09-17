<script lang="ts">
  import { useStackTrace } from './stack-trace-context.svelte.ts'

  interface StackTraceFramesProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: StackTraceFramesProps = $props()
  const { onFilePathClick, trace } = useStackTrace()
</script>

<div {...rest} data-scope="stack-trace" data-part="frames">
  {#if children}
    {@render children()}
  {:else}
    {#each trace.frames as frame, index (index)}
      <div data-internal={frame.isInternal || undefined} data-scope="stack-trace" data-part="frame">
        {#if frame.functionName}
          <span data-scope="stack-trace" data-part="frame-name">{frame.functionName}</span>
        {/if}
        {#if frame.filePath}
          <button
            data-scope="stack-trace"
            data-part="frame-path"
            onclick={onFilePathClick ? () => onFilePathClick(frame.filePath ?? '', frame.lineNumber ?? undefined, frame.columnNumber ?? undefined) : undefined}
            type="button"
          >
            {frame.filePath}{frame.lineNumber !== null ? ':' + frame.lineNumber : ''}{frame.columnNumber !== null ? ':' + frame.columnNumber : ''}
          </button>
        {/if}
      </div>
    {/each}
  {/if}
</div>
