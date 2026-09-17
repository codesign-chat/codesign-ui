import 'styles/ai.module.css'
import { ChevronDownIcon, PencilIcon, TrashIcon } from 'lucide-react'
import {
  Queue,
  QueueItem,
  QueueItemAction,
  QueueItemActions,
  QueueItemContent,
  QueueItemDescription,
  QueueItemIndicator,
  QueueList,
  QueueSection,
  QueueSectionContent,
  QueueSectionLabel,
  QueueSectionTrigger,
} from '../queue.tsx'

const QUEUED = [
  'Summarize the streamdown changelog',
  'Draft release notes for v2',
  'Compare bundle sizes across frameworks',
]
const RUNNING = 'Refactor the conversation scroll behavior'
const COMPLETED = ['Audit console errors across stories', 'Fix the terminal cursor animation']

export function Basic() {
  return (
    <Queue style={{ maxWidth: 460 }}>
      <QueueSection defaultOpen={false}>
        <QueueSectionTrigger>
          <QueueSectionLabel count={COMPLETED.length} indicator={<ChevronDownIcon />} label="completed" />
        </QueueSectionTrigger>
        <QueueSectionContent>
          <QueueList>
            {COMPLETED.map((message) => (
              <QueueItem key={message}>
                <QueueItemIndicator completed />
                <QueueItemContent completed>{message}</QueueItemContent>
                <QueueItemActions>
                  <QueueItemAction aria-label="Delete">
                    <TrashIcon />
                  </QueueItemAction>
                </QueueItemActions>
              </QueueItem>
            ))}
          </QueueList>
        </QueueSectionContent>
      </QueueSection>

      <QueueSection defaultOpen>
        <QueueSectionTrigger>
          <QueueSectionLabel count={QUEUED.length + 1} indicator={<ChevronDownIcon />} label="queued" />
        </QueueSectionTrigger>
        <QueueSectionContent>
          <QueueList>
            <QueueItem>
              <QueueItemIndicator />
              <QueueItemContent>{RUNNING}</QueueItemContent>
              <QueueItemDescription>Currently processing</QueueItemDescription>
              <QueueItemActions>
                <QueueItemAction aria-label="Edit">
                  <PencilIcon />
                </QueueItemAction>
                <QueueItemAction aria-label="Delete">
                  <TrashIcon />
                </QueueItemAction>
              </QueueItemActions>
            </QueueItem>
            {QUEUED.map((message) => (
              <QueueItem key={message}>
                <QueueItemIndicator />
                <QueueItemContent>{message}</QueueItemContent>
                <QueueItemActions>
                  <QueueItemAction aria-label="Edit">
                    <PencilIcon />
                  </QueueItemAction>
                  <QueueItemAction aria-label="Delete">
                    <TrashIcon />
                  </QueueItemAction>
                </QueueItemActions>
              </QueueItem>
            ))}
          </QueueList>
        </QueueSectionContent>
      </QueueSection>
    </Queue>
  )
}
