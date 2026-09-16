import 'styles/ai.module.css'
import { CheckIcon, CopyIcon } from 'lucide-react'
import { Snippet, SnippetCopyButton, SnippetInput } from '../snippet.tsx'

export function Basic() {
  return (
    <Snippet code="npx @codesign-ui/ai@latest add prompt-input">
      <SnippetInput />
      <SnippetCopyButton>{(copied) => (copied ? <CheckIcon size={12} /> : <CopyIcon size={12} />)}</SnippetCopyButton>
    </Snippet>
  )
}
