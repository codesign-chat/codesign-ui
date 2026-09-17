<script lang="ts">
  import { setContext } from 'svelte'
  import { codeBlockKey } from './code-block-context.svelte.ts'
  import type { BundledLanguage } from 'shiki'
  import CodeBlockContainer from './code-block-container.svelte'
  import CodeBlockContent from './code-block-content.svelte'

  interface CodeBlockProps {
    code: string
    language: BundledLanguage
    showLineNumbers?: boolean
    children?: import('svelte').Snippet
  }

  let { code, language, showLineNumbers = false, children, ...rest }: CodeBlockProps = $props()

  setContext(codeBlockKey, { code })
</script>

<CodeBlockContainer {...rest} language={language}>
  {@render children?.()}
  <CodeBlockContent {code} {language} {showLineNumbers} />
</CodeBlockContainer>
