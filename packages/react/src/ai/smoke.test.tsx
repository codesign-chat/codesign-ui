import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import * as attachments from './attachments/examples/attachments-examples.tsx'
import * as agent from './agent/examples/basic.tsx'
import * as artifact from './artifact/examples/basic.tsx'
import * as chainOfThought from './chain-of-thought/examples/basic.tsx'
import * as checkpoint from './checkpoint/examples/basic.tsx'
import * as codeBlock from './code-block/examples/basic.tsx'
import * as commit from './commit/examples/basic.tsx'
import * as confirmation from './confirmation/examples/basic.tsx'
import * as chat from './conversation/examples/chat.tsx'
import * as conversation from './conversation/examples/basic.tsx'
import * as context from './context/examples/basic.tsx'
import * as environmentVariables from './environment-variables/examples/basic.tsx'
import * as inlineCitation from './inline-citation/examples/basic.tsx'
import * as jsxPreview from './jsx-preview/examples/basic.tsx'
import * as message from './message/examples/message-examples.tsx'
import * as packageInfo from './package-info/examples/basic.tsx'
import * as modelSelector from './model-selector/examples/basic.tsx'
import * as plan from './plan/examples/basic.tsx'
import * as promptInput from './prompt-input/examples/basic.tsx'
import * as queue from './queue/examples/basic.tsx'
import * as question from './question/examples/basic.tsx'
import * as reasoning from './reasoning/examples/basic.tsx'
import * as sandbox from './sandbox/examples/basic.tsx'
import * as schemaDisplay from './schema-display/examples/basic.tsx'
import * as stackTrace from './stack-trace/examples/basic.tsx'
import * as shimmerModule from './shimmer/shimmer.tsx'
import * as snippet from './snippet/examples/basic.tsx'
import * as sources from './sources/examples/basic.tsx'
import * as suggestion from './suggestion/examples/basic.tsx'
import * as task from './task/examples/basic.tsx'
import * as terminal from './terminal/examples/basic.tsx'
import * as testResults from './test-results/examples/basic.tsx'
import * as tool from './tool/examples/basic.tsx'
import * as webPreview from './web-preview/examples/basic.tsx'

const MODULES = {
  agent,
  artifact,
  attachments,
  chainOfThought,
  chat,
  checkpoint,
  codeBlock,
  commit,
  confirmation,
  conversation,
  context,
  environmentVariables,
  inlineCitation,
  jsxPreview,
  message,
  packageInfo,
  modelSelector,
  plan,
  promptInput,
  queue,
  question,
  reasoning,
  sandbox,
  schemaDisplay,
  snippet,
  sources,
  suggestion,
  task,
  terminal,
  stackTrace,
  testResults,
  tool,
  webPreview,
}

describe('AI examples render smoke', () => {
  it('renders shimmer/Shimmer', () => {
    const { Shimmer } = shimmerModule
    const { unmount } = render(<Shimmer>Thinking...</Shimmer>)
    unmount()
    expect(true).toBe(true)
  })

  for (const [moduleName, moduleExports] of Object.entries(MODULES)) {
    for (const [exportName, MaybeComponent] of Object.entries(moduleExports)) {
      if (typeof MaybeComponent !== 'function') {
        continue
      }
      const Component = MaybeComponent
      it(`renders ${moduleName}/${exportName}`, () => {
        const { unmount } = render(<Component />)
        unmount()
        expect(true).toBe(true)
      })
    }
  }
})

import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

describe('AI examples load the reference stylesheet', () => {
  const aiRoot = __dirname
  const exampleFiles = readdirSync(aiRoot, { recursive: true })
    .map(String)
    .filter((f) => f.includes('examples/') && f.endsWith('.tsx') && !f.includes('.test.'))

  it('every example imports styles/ai.module.css', () => {
    const missing = exampleFiles.filter((f) => !readFileSync(join(aiRoot, f), 'utf8').includes('styles/ai.module.css'))
    expect(missing).toEqual([])
  })
})
