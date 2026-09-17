import 'styles/ai.module.css'
import { BookmarkIcon, ChevronsUpDownIcon, EllipsisIcon } from 'lucide-react'
import {
  Plan,
  PlanAction,
  PlanBody,
  PlanContent,
  PlanDescription,
  PlanFooter,
  PlanHeader,
  PlanTitle,
  PlanTrigger,
} from '../plan.tsx'

const STEPS = [
  { detail: 'Locate the streaming handler and the scroll container', title: 'Fix scroll jumping during stream' },
  { detail: 'Restore the stick-to-bottom behavior after user scroll', title: 'Preserve scroll position on rerender' },
  { detail: 'Add a story that streams 50 messages on mount', title: 'Cover the regression with a story' },
]

export function Basic() {
  return (
    <Plan defaultOpen style={{ maxWidth: 460 }}>
      <PlanHeader>
        <div>
          <PlanTitle>Refactor plan: conversation scrolling</PlanTitle>
          <PlanDescription>Three steps, focused on the scroll container behavior</PlanDescription>
        </div>
        <PlanAction>
          <PlanTrigger aria-label="Toggle plan">
            <ChevronsUpDownIcon />
          </PlanTrigger>
        </PlanAction>
      </PlanHeader>
      <PlanContent>
        <PlanBody>
          <ol>
            {STEPS.map((step) => (
              <li key={step.title}>
                <strong>{step.title}</strong>
                <p>{step.detail}</p>
              </li>
            ))}
          </ol>
        </PlanBody>
        <PlanFooter>
          <button type="button">Approve plan</button>
        </PlanFooter>
      </PlanContent>
    </Plan>
  )
}

export function Streaming() {
  return (
    <Plan isStreaming style={{ maxWidth: 460 }}>
      <PlanHeader>
        <div>
          <PlanTitle>Updating plan</PlanTitle>
          <PlanDescription>Adjusting the remaining steps</PlanDescription>
        </div>
        <PlanAction>
          <PlanTrigger aria-label="Toggle plan">
            <ChevronsUpDownIcon />
          </PlanTrigger>
        </PlanAction>
      </PlanHeader>
      <PlanContent>
        <PlanBody>
          <p>Streaming plans animate their title and description while they change.</p>
        </PlanBody>
      </PlanContent>
    </Plan>
  )
}

export function WithIcons() {
  return (
    <Plan style={{ maxWidth: 460 }}>
      <PlanHeader>
        <div>
          <PlanTitle>Plan with leading icon</PlanTitle>
        </div>
        <PlanAction>
          <BookmarkIcon />
          <PlanTrigger aria-label="Toggle plan">
            <ChevronsUpDownIcon />
          </PlanTrigger>
        </PlanAction>
      </PlanHeader>
      <PlanContent>
        <PlanBody>
          <p>Actions can hold any buttons or indicators.</p>
        </PlanBody>
        <PlanFooter>
          <button type="button">
            <EllipsisIcon /> More
          </button>
        </PlanFooter>
      </PlanContent>
    </Plan>
  )
}
