import 'styles/ai.module.css'
import { useState } from 'react'
import {
  Question,
  QuestionActions,
  QuestionDescription,
  QuestionInput,
  QuestionOption,
  QuestionOptions,
  QuestionPrompt,
  QuestionSubmit,
} from '../question.tsx'
import type { QuestionResponse } from '../question.tsx'

export function Basic() {
  const [response, setResponse] = useState<QuestionResponse | null>(null)

  return (
    <div style={{ maxWidth: 420 }}>
      <Question
        onSubmit={(value) => {
          setResponse(value)
        }}
      >
        <QuestionPrompt>Which areas should we focus on next?</QuestionPrompt>
        <QuestionDescription>Pick the one that matters most to you.</QuestionDescription>
        <QuestionOptions aria-label="Focus areas">
          <QuestionOption value="streaming">Streaming reliability</QuestionOption>
          <QuestionOption value="styling">Styling ergonomics</QuestionOption>
          <QuestionOption value="docs">Documentation</QuestionOption>
        </QuestionOptions>
        <QuestionInput />
        <QuestionActions>
          <QuestionSubmit />
        </QuestionActions>
      </Question>
      {response && (
        <p>
          Submitted: {response.selectedValues.join(', ') || '(none)'} — {response.text ?? '(no comment)'}
        </p>
      )}
    </div>
  )
}

export function Multiple() {
  return (
    <Question selectionMode="multiple" style={{ maxWidth: 420 }}>
      <QuestionPrompt>Which frameworks do you target?</QuestionPrompt>
      <QuestionOptions aria-label="Frameworks">
        <QuestionOption value="react">React</QuestionOption>
        <QuestionOption value="solid">Solid</QuestionOption>
        <QuestionOption value="vue">Vue</QuestionOption>
        <QuestionOption value="svelte">Svelte</QuestionOption>
      </QuestionOptions>
      <QuestionActions>
        <QuestionSubmit>Continue</QuestionSubmit>
      </QuestionActions>
    </Question>
  )
}
