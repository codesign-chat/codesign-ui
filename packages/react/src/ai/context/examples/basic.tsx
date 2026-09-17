import 'styles/ai.module.css'
import {
  Context,
  ContextCacheUsage,
  ContextContent,
  ContextContentBody,
  ContextContentFooter,
  ContextContentHeader,
  ContextInputUsage,
  ContextOutputUsage,
  ContextReasoningUsage,
  ContextTrigger,
} from '../context.tsx'

const USAGE = {
  cachedInputTokens: 41_200,
  inputTokens: 58_400,
  outputTokens: 3_100,
  reasoningTokens: 9_800,
}

export function Basic() {
  return (
    <div style={{ maxWidth: 420 }}>
      <Context
        costs={{ cache: 0.02, input: 0.18, output: 0.05, reasoning: 0.03, total: 0.28 }}
        maxTokens={200_000}
        usedTokens={71_500}
        usage={USAGE}
      >
        <ContextTrigger />
        <ContextContent>
          <ContextContentHeader />
          <ContextContentBody>
            <ContextInputUsage />
            <ContextOutputUsage />
            <ContextReasoningUsage />
            <ContextCacheUsage />
          </ContextContentBody>
          <ContextContentFooter />
        </ContextContent>
      </Context>
    </div>
  )
}

export function CustomTrigger() {
  return (
    <div style={{ maxWidth: 420 }}>
      <Context maxTokens={128_000} usedTokens={96_400}>
        <ContextTrigger>
          <span>96,400 / 128,000 tokens</span>
        </ContextTrigger>
        <ContextContent>
          <ContextContentHeader />
          <ContextContentBody>
            <p>Pass children to ContextTrigger for a custom label.</p>
          </ContextContentBody>
        </ContextContent>
      </Context>
    </div>
  )
}
