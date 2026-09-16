import { FilePlus2Icon } from 'lucide-react'
import {
  ChainOfThought,
  ChainOfThoughtContent,
  ChainOfThoughtHeader,
  ChainOfThoughtImage,
  ChainOfThoughtSearchResult,
  ChainOfThoughtSearchResults,
  ChainOfThoughtStep,
} from '../chain-of-thought.tsx'

export function Basic() {
  return (
    <ChainOfThought>
      <ChainOfThoughtHeader />
      <ChainOfThoughtContent>
        <ChainOfThoughtStep icon={<FilePlus2Icon />} label="Upload document" status="complete" />
        <ChainOfThoughtStep
          description="Matched the query against the components index"
          label="Search internal knowledge"
          status="active"
        >
          <ChainOfThoughtSearchResults>
            <ChainOfThoughtSearchResult>ai.module.css</ChainOfThoughtSearchResult>
            <ChainOfThoughtSearchResult>conversation.stories.tsx</ChainOfThoughtSearchResult>
          </ChainOfThoughtSearchResults>
        </ChainOfThoughtStep>
        <ChainOfThoughtStep label="Draft response" status="pending" />
        <ChainOfThoughtImage caption="Reference architecture diagram">
          <svg aria-hidden="true" height="96" viewBox="0 0 160 96" width="160">
            <rect fill="none" height="94" stroke="#eb5e41" width="158" x="1" y="1" />
            <text fill="currentColor" fontSize="12" textAnchor="middle" x="80" y="52">
              components → themes
            </text>
          </svg>
        </ChainOfThoughtImage>
      </ChainOfThoughtContent>
    </ChainOfThought>
  )
}
