<script lang="ts">
  import { parseAnsi } from './ansi.ts'
  import { useTerminal } from './terminal-context.svelte.ts'

  interface TerminalContentProps {
    children?: import('svelte').Snippet
  }

  let { children, ...rest }: TerminalContentProps = $props()
  const { output, isStreaming, autoScroll } = useTerminal()

  let containerRef: HTMLDivElement | undefined = $state()

  $effect(() => {
    void output
    if (autoScroll && containerRef) {
      containerRef.scrollTop = containerRef.scrollHeight
    }
  })

  const segments = $derived(parseAnsi(output))
</script>

<div bind:this={containerRef} {...rest} data-scope="terminal" data-part="content">
  {#if children}
    {@render children()}
  {:else}
    <pre data-scope="terminal" data-part="output">
      {#each segments as segment}
        <span style:color={segment.color} style:font-weight={segment.bold ? 'bold' : undefined} style:opacity={segment.faint ? 0.6 : undefined}>{segment.text}</span>
      {/each}
      {#if isStreaming}
        <span data-scope="terminal" data-part="cursor"></span>
      {/if}
    </pre>
  {/if}
</div>
