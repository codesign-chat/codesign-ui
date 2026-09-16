import 'styles/ai.module.css'
import { CheckIcon, CopyIcon, Trash2Icon } from 'lucide-react'
import { useRef, useState } from 'react'
import {
  Terminal,
  TerminalActions,
  TerminalClearButton,
  TerminalContent,
  TerminalCopyButton,
  TerminalHeader,
  TerminalStatus,
  TerminalTitle,
} from '../terminal.tsx'

const LOG = [
  '$ bun run test',
  '  ✓ src/ai/conversation/examples/chat.test.tsx (1 test) 2571ms',
  '  ✓ src/ai/attachments/attachments.test.ts (6 tests) 2ms',
  '',
  ' Test Files  2 passed (2)',
  '      Tests  7 passed (7)',
].join('\n')

export function Basic() {
  const [output, setOutput] = useState(LOG)

  return (
    <Terminal onClear={() => setOutput('')} output={output} style={{ height: 320, width: 560 }}>
      <TerminalHeader>
        <TerminalTitle />
        <div data-part="header-actions">
          <TerminalActions>
            <TerminalCopyButton>
              {(copied) => (copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />)}
            </TerminalCopyButton>
            <TerminalClearButton>
              <Trash2Icon size={14} />
            </TerminalClearButton>
          </TerminalActions>
        </div>
      </TerminalHeader>
      <TerminalContent />
    </Terminal>
  )
}

export function Streaming() {
  const [output, setOutput] = useState('$ bun run build\n')
  const lines = useRef(['bundling packages/react…', 'emitting dist/index.js', 'done in 1.2s'])
  const index = useRef(0)

  return (
    <Terminal
      isStreaming
      onClear={() => {
        index.current = 0
        setOutput('$ bun run build\n')
      }}
      output={output}
      style={{ height: 320, width: 560 }}
    >
      <TerminalHeader>
        <TerminalTitle />
        <div data-part="header-actions">
          <TerminalStatus>streaming</TerminalStatus>
        </div>
      </TerminalHeader>
      <TerminalContent />
      <button
        onClick={() => {
          if (index.current < lines.current.length) {
            setOutput((prev) => `${prev}${lines.current[index.current]}\n`)
            index.current += 1
          }
        }}
        type="button"
      >
        Append line
      </button>
    </Terminal>
  )
}
