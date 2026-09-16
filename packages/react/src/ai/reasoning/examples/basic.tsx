import 'styles/ai.module.css'
import { Reasoning, ReasoningContent, ReasoningTrigger } from '../reasoning.tsx'

export function Completed() {
  return (
    <Reasoning duration={8}>
      <ReasoningTrigger />
      <ReasoningContent>
        {
          'The user asked about the component contract. I considered the data-part attributes, checked how the reference stylesheet targets them, and confirmed that light and dark mode both work through the shared tokens.'
        }
      </ReasoningContent>
    </Reasoning>
  )
}

export function Streaming() {
  return (
    <Reasoning isStreaming>
      <ReasoningTrigger />
      <ReasoningContent>
        {
          'Thinking through the approach step by step: first inspect the existing stories, then compare the token vocabulary, then align the reference styles.'
        }
      </ReasoningContent>
    </Reasoning>
  )
}
