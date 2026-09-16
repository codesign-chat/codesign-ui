import 'styles/ai.module.css'
import { CheckIcon, CopyIcon } from 'lucide-react'
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockHeader,
  CodeBlockTitle,
} from '../code-block.tsx'
import type { BundledLanguage } from 'shiki'

const SAMPLE = `import { Conversation } from '@codesign-ui/react/ai'

export function Welcome() {
  return <Conversation>@codesign-ui/ai is ready.</Conversation>
}`

export function Basic() {
  return (
    <CodeBlock code={SAMPLE} language="tsx" showLineNumbers>
      <CodeBlockHeader>
        <CodeBlockTitle>
          <CodeBlockFilename>welcome.tsx</CodeBlockFilename>
        </CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton>
            {(copied) => (copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />)}
          </CodeBlockCopyButton>
        </CodeBlockActions>
      </CodeBlockHeader>
    </CodeBlock>
  )
}

export function Plain() {
  const code = 'npx @codesign-ui/ai@latest add conversation'
  return (
    <CodeBlock code={code} language={'bash' as BundledLanguage}>
      <CodeBlockHeader>
        <CodeBlockTitle>
          <CodeBlockFilename>terminal</CodeBlockFilename>
        </CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton>
            {(copied) => (copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />)}
          </CodeBlockCopyButton>
        </CodeBlockActions>
      </CodeBlockHeader>
    </CodeBlock>
  )
}
