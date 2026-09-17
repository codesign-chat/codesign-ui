import 'styles/ai.module.css'
import { ArrowLeftIcon, ArrowRightIcon, ChevronDownIcon, RotateCwIcon } from 'lucide-react'
import {
  WebPreview,
  WebPreviewBody,
  WebPreviewConsole,
  WebPreviewNavigation,
  WebPreviewNavigationButton,
  WebPreviewUrl,
} from '../web-preview.tsx'

const LOGS = [
  { level: 'log' as const, message: 'preview ready', timestamp: new Date('2026-09-17T10:00:00') },
  { level: 'warn' as const, message: 'deprecated API called', timestamp: new Date('2026-09-17T10:00:01') },
]

export function Basic() {
  return (
    <WebPreview defaultUrl="https://example.com" style={{ maxWidth: 560 }}>
      <WebPreviewNavigation>
        <WebPreviewNavigationButton tooltip="Back">
          <ArrowLeftIcon />
        </WebPreviewNavigationButton>
        <WebPreviewNavigationButton tooltip="Forward">
          <ArrowRightIcon />
        </WebPreviewNavigationButton>
        <WebPreviewNavigationButton tooltip="Reload">
          <RotateCwIcon />
        </WebPreviewNavigationButton>
        <WebPreviewUrl />
      </WebPreviewNavigation>
      <WebPreviewBody />
      <WebPreviewConsole indicator={<ChevronDownIcon />} logs={LOGS} />
    </WebPreview>
  )
}

export function Empty() {
  return (
    <WebPreview style={{ maxWidth: 560 }}>
      <WebPreviewNavigation>
        <WebPreviewUrl />
      </WebPreviewNavigation>
      <WebPreviewBody />
      <WebPreviewConsole />
    </WebPreview>
  )
}
