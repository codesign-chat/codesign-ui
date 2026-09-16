import { useState } from 'react'
import { Suggestion, Suggestions } from '../suggestion.tsx'

const PROMPTS = ['Draft a launch announcement', 'Summarize this thread', 'Suggest three subject lines']

export function Basic() {
  const [last, setLast] = useState<string | null>(null)

  return (
    <div style={{ display: 'grid', gap: 16, maxWidth: 480 }}>
      <Suggestions>
        {PROMPTS.map((prompt) => (
          <Suggestion key={prompt} onClick={setLast} suggestion={prompt} />
        ))}
      </Suggestions>
      <p>{last ? `Clicked: ${last}` : 'Click a suggestion.'}</p>
    </div>
  )
}
