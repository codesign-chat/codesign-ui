<script lang="ts">
  import { setContext } from 'svelte'
  import TerminalHeader from './terminal-header.svelte'
  import TerminalTitle from './terminal-title.svelte'
  import TerminalStatus from './terminal-status.svelte'
  import TerminalActions from './terminal-actions.svelte'
  import TerminalCopyButton from './terminal-copy-button.svelte'
  import TerminalClearButton from './terminal-clear-button.svelte'
  import TerminalContent from './terminal-content.svelte'
  import { terminalKey } from './terminal-context.svelte.ts'

  interface TerminalProps {
    autoScroll?: boolean
    isStreaming?: boolean
    onClear?: () => void
    output: string
    children?: import('svelte').Snippet
  }

  let { autoScroll = true, isStreaming = false, onClear, output, children, ...rest }: TerminalProps = $props()

  setContext(terminalKey, { autoScroll, isStreaming, onClear, output })
</script>

<div {...rest} data-scope="terminal" data-part="root">
  {#if children}
    {@render children()}
  {:else}
    <TerminalHeader>
      <TerminalTitle />
      <div data-scope="terminal" data-part="header-actions">
        <TerminalStatus />
        <TerminalActions>
          <TerminalCopyButton />
          {#if onClear}
            <TerminalClearButton />
          {/if}
        </TerminalActions>
      </div>
    </TerminalHeader>
    <TerminalContent />
  {/if}
</div>
