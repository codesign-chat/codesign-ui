import 'styles/ai.module.css'
import { Source, Sources, SourcesContent, SourcesTrigger } from '../sources.tsx'

export function Basic() {
  return (
    <Sources>
      <SourcesTrigger count={2} />
      <SourcesContent>
        <Source href="https://codesign.chat" title="Codesign UI documentation" />
        <Source href="https://zagjs.com" title="Zag.js state machines" />
      </SourcesContent>
    </Sources>
  )
}
