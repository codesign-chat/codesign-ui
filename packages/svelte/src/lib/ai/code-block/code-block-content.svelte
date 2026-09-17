<script lang="ts">
  import type { BundledLanguage, ThemedToken } from 'shiki'
  import { createRawTokens, highlightCode, isBold, isItalic, isUnderline } from './highlight.ts'

  interface CodeBlockContentProps {
    code: string
    language: BundledLanguage
    showLineNumbers?: boolean
  }

  let { code, language, showLineNumbers = false }: CodeBlockContentProps = $props()

  let asyncTokens = $state<{ tokens: ThemedToken[][]; fg: string; bg: string } | null>(null)

  const tokenized = $derived(asyncTokens ?? highlightCode(code, language) ?? createRawTokens(code))

  highlightCode(code, language, (result) => {
    asyncTokens = result
  })

  const tokenStyle = (token: ThemedToken): string => {
    let style = ''
    if (token.bgColor) style += 'background-color:' + token.bgColor + ';'
    if (token.color) style += 'color:' + token.color + ';'
    if (isItalic(token.fontStyle)) style += 'font-style:italic;'
    if (isBold(token.fontStyle)) style += 'font-weight:bold;'
    if (isUnderline(token.fontStyle)) style += 'text-decoration:underline;'
    return style
  }
</script>

<div data-scope="code-block" data-part="content">
  <pre data-scope="code-block" data-part="pre" style:background-color={tokenized.bg} style:color={tokenized.fg}>
    <code data-part="code-inner" data-line-numbers={showLineNumbers || undefined}>
      {#each tokenized.tokens as line}
        <span data-part="line" data-line-numbers={showLineNumbers || undefined}>
          {#if line.length === 0}
            {'\n'}
          {:else}
            {#each line as token}<span data-part="token" style={tokenStyle(token)}>{token.content}</span>{/each}
          {/if}
        </span>
      {/each}
    </code>
  </pre>
</div>
