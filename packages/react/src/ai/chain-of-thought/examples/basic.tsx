import 'styles/ai.module.css'
import { ChevronDownIcon, CircleDashedIcon, FilePlus2Icon, LoaderCircleIcon } from 'lucide-react'
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
    <ChainOfThought defaultOpen>
      <ChainOfThoughtHeader indicator={<ChevronDownIcon />} />
      <ChainOfThoughtContent>
        <ChainOfThoughtStep icon={<FilePlus2Icon />} label="Upload document" status="complete" />
        <ChainOfThoughtStep
          description="Matched the query against the components index"
          icon={<LoaderCircleIcon />}
          label="Search internal knowledge"
          status="active"
        >
          <ChainOfThoughtSearchResults>
            <ChainOfThoughtSearchResult>ai.module.css</ChainOfThoughtSearchResult>
            <ChainOfThoughtSearchResult>conversation.stories.tsx</ChainOfThoughtSearchResult>
          </ChainOfThoughtSearchResults>
        </ChainOfThoughtStep>
        <ChainOfThoughtStep icon={<CircleDashedIcon />} label="Draft response" status="pending" />
        <ChainOfThoughtImage caption="Reference architecture diagram">
          <svg aria-hidden="true" height="96" viewBox="0 0 200 96" width="200">
            <rect fill="none" height="94" stroke="#eb5e41" width="198" x="1" y="1" />
            <text fill="currentColor" style={{ fontSize: 12 }} textAnchor="middle" x="100" y="52">
              components → themes
            </text>
          </svg>
        </ChainOfThoughtImage>
      </ChainOfThoughtContent>
    </ChainOfThought>
  )
}
