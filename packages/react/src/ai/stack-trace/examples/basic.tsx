import 'styles/ai.module.css'
import { CheckIcon, CopyIcon } from 'lucide-react'
import {
  StackTrace,
  StackTraceActions,
  StackTraceContent,
  StackTraceCopyButton,
  StackTraceErrorType,
  StackTraceErrorMessage,
  StackTraceFrames,
  StackTraceHeader,
} from '../stack-trace.tsx'

const TRACE = `TypeError: Cannot read properties of undefined (reading 'map')
    at MessageList (src/components/message-list.tsx:42:19)
    at renderWithHooks (node_modules/react-dom/cjs/react-dom.development.js:15486:18)
    at Conversation (src/components/conversation.tsx:88:3)
    at renderComposite (internal/renderer.ts:210:5)`

export function Basic() {
  return (
    <StackTrace defaultOpen style={{ maxWidth: 560 }} trace={TRACE}>
      <StackTraceHeader>
        <StackTraceErrorType />
        <StackTraceErrorMessage />
        <StackTraceActions>
          <StackTraceCopyButton>{(copied) => (copied ? <CheckIcon /> : <CopyIcon />)}</StackTraceCopyButton>
        </StackTraceActions>
      </StackTraceHeader>
      <StackTraceContent>
        <StackTraceFrames />
      </StackTraceContent>
    </StackTrace>
  )
}

export function Collapsed() {
  return (
    <StackTrace style={{ maxWidth: 560 }} trace={TRACE}>
      <StackTraceHeader>
        <StackTraceErrorType />
        <StackTraceErrorMessage />
      </StackTraceHeader>
      <StackTraceContent>
        <StackTraceFrames />
      </StackTraceContent>
    </StackTrace>
  )
}
