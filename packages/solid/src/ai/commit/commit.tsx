import { Show, createMemo, createSignal, splitProps } from 'solid-js'
import type { JSX } from 'solid-js'
import { CollapsibleRoot, CollapsibleTrigger, CollapsibleContent } from '../../components/collapsible/index.ts'
import { AvatarRoot, AvatarFallback } from '../../components/avatar/index.ts'

const SCOPE = 'commit'

export type CommitProps = JSX.HTMLAttributes<HTMLDivElement>

export function Commit(props: CommitProps) {
  return <CollapsibleRoot data-scope={SCOPE} data-part="root" {...props} />
}

export type CommitHeaderProps = JSX.HTMLAttributes<HTMLDivElement>

export function CommitHeader(props: CommitHeaderProps) {
  return <CollapsibleTrigger data-scope={SCOPE} data-part="header" {...(props as any)} />
}

export type CommitHashProps = JSX.HTMLAttributes<HTMLSpanElement>

export function CommitHash(props: CommitHashProps) {
  return <span data-scope={SCOPE} data-part="hash" {...props} />
}

export type CommitMessageProps = JSX.HTMLAttributes<HTMLSpanElement>

export function CommitMessage(props: CommitMessageProps) {
  return <span data-scope={SCOPE} data-part="message" {...props} />
}

export type CommitMetadataProps = JSX.HTMLAttributes<HTMLDivElement>

export function CommitMetadata(props: CommitMetadataProps) {
  return <div data-scope={SCOPE} data-part="metadata" {...props} />
}

export type CommitSeparatorProps = JSX.HTMLAttributes<HTMLSpanElement>

export function CommitSeparator(props: CommitSeparatorProps) {
  const [local, rest] = splitProps(props, ['children'])
  return (
    <span data-scope={SCOPE} data-part="separator" {...rest}>
      {local.children ?? '•'}
    </span>
  )
}

export type CommitInfoProps = JSX.HTMLAttributes<HTMLDivElement>

export function CommitInfo(props: CommitInfoProps) {
  return <div data-scope={SCOPE} data-part="info" {...props} />
}

export type CommitAuthorProps = JSX.HTMLAttributes<HTMLDivElement>

export function CommitAuthor(props: CommitAuthorProps) {
  return <div data-scope={SCOPE} data-part="author" {...props} />
}

export type CommitAuthorAvatarProps = JSX.HTMLAttributes<HTMLDivElement> & {
  initials: string
}

export function CommitAuthorAvatar(props: CommitAuthorAvatarProps) {
  const [local, rest] = splitProps(props, ['initials', 'children'])
  return (
    <AvatarRoot data-scope={SCOPE} data-part="author-avatar" {...rest}>
      <AvatarFallback>{local.initials}</AvatarFallback>
    </AvatarRoot>
  )
}

export type CommitTimestampProps = JSX.HTMLAttributes<HTMLTimeElement> & {
  date: Date
}

const relativeTimeFormat = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

const formatRelativeDate = (date: Date) => {
  const days = Math.round((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  return relativeTimeFormat.format(days, 'day')
}

export function CommitTimestamp(props: CommitTimestampProps) {
  const [local, rest] = splitProps(props, ['date', 'children'])
  const formatted = createMemo(() => formatRelativeDate(local.date))

  return (
    <time data-scope={SCOPE} data-part="timestamp" dateTime={local.date.toISOString()} {...rest}>
      {local.children ?? formatted()}
    </time>
  )
}

export type CommitActionsProps = JSX.HTMLAttributes<HTMLDivElement>

export function CommitActions(props: CommitActionsProps) {
  const [local, rest] = splitProps(props, ['onClick', 'onKeyDown', 'children'])
  return (
    <div
      data-scope={SCOPE}
      data-part="actions"
      onClick={(event: globalThis.MouseEvent) => {
        event.stopPropagation()
        ;(local.onClick as any)?.(event)
      }}
      onKeyDown={(event: globalThis.KeyboardEvent) => {
        event.stopPropagation()
        ;(local.onKeyDown as any)?.(event)
      }}
      role="group"
      {...rest}
    >
      {local.children}
    </div>
  )
}

export type CommitCopyButtonProps = JSX.HTMLAttributes<HTMLButtonElement> & {
  hash: string
  timeout?: number
}

export function CommitCopyButton(props: CommitCopyButtonProps) {
  const [local, rest] = splitProps(props, ['hash', 'timeout', 'children', 'onClick'])
  const [isCopied, setIsCopied] = createSignal(false)
  let timer: ReturnType<typeof setTimeout> | undefined

  return (
    <button
      aria-label="Copy hash"
      data-copied={isCopied() || undefined}
      data-scope={SCOPE}
      data-part="copy-button"
      onClick={(event) => {
        ;(local.onClick as any)?.(event)
        navigator.clipboard
          .writeText(local.hash)
          .then(() => {
            setIsCopied(true)
            if (timer) clearTimeout(timer)
            timer = setTimeout(() => setIsCopied(false), local.timeout ?? 2000)
          })
          .catch(() => {
            // clipboard unavailable
          })
      }}
      type="button"
      {...rest}
    >
      <Show when={typeof local.children === 'function'} fallback={local.children}>
        {(local.children as unknown as (isCopied: boolean) => JSX.Element)(isCopied())}
      </Show>
    </button>
  )
}

export type CommitContentProps = JSX.HTMLAttributes<HTMLDivElement>

export function CommitContent(props: CommitContentProps) {
  return <CollapsibleContent data-scope={SCOPE} data-part="content" {...(props as any)} />
}

export type CommitFilesProps = JSX.HTMLAttributes<HTMLDivElement>

export function CommitFiles(props: CommitFilesProps) {
  return <div data-scope={SCOPE} data-part="files" {...props} />
}

export type CommitFileProps = JSX.HTMLAttributes<HTMLDivElement>

export function CommitFile(props: CommitFileProps) {
  return <div data-scope={SCOPE} data-part="file" {...props} />
}

export type CommitFileInfoProps = JSX.HTMLAttributes<HTMLDivElement>

export function CommitFileInfo(props: CommitFileInfoProps) {
  return <div data-scope={SCOPE} data-part="file-info" {...props} />
}

export type CommitFileStatusProps = JSX.HTMLAttributes<HTMLSpanElement> & {
  status: 'added' | 'deleted' | 'modified' | 'renamed'
}

const fileStatusLabels = { added: 'A', deleted: 'D', modified: 'M', renamed: 'R' }

export function CommitFileStatus(props: CommitFileStatusProps) {
  const [local, rest] = splitProps(props, ['status', 'children'])
  return (
    <span data-scope={SCOPE} data-part="file-status" data-status={local.status} {...rest}>
      {local.children ?? fileStatusLabels[local.status]}
    </span>
  )
}

export type CommitFilePathProps = JSX.HTMLAttributes<HTMLSpanElement>

export function CommitFilePath(props: CommitFilePathProps) {
  return <span data-scope={SCOPE} data-part="file-path" {...props} />
}

export type CommitFileChangesProps = JSX.HTMLAttributes<HTMLDivElement>

export function CommitFileChanges(props: CommitFileChangesProps) {
  return <div data-scope={SCOPE} data-part="file-changes" {...props} />
}

export type CommitFileAdditionsProps = JSX.HTMLAttributes<HTMLSpanElement> & {
  count: number
}

export function CommitFileAdditions(props: CommitFileAdditionsProps) {
  const [local, rest] = splitProps(props, ['count', 'children'])
  return (
    <Show when={local.count > 0}>
      <span data-scope={SCOPE} data-part="file-additions" {...rest}>
        {local.children ?? `+${local.count}`}
      </span>
    </Show>
  )
}

export type CommitFileDeletionsProps = JSX.HTMLAttributes<HTMLSpanElement> & {
  count: number
}

export function CommitFileDeletions(props: CommitFileDeletionsProps) {
  const [local, rest] = splitProps(props, ['count', 'children'])
  return (
    <Show when={local.count > 0}>
      <span data-scope={SCOPE} data-part="file-deletions" {...rest}>
        {local.children ?? `-${local.count}`}
      </span>
    </Show>
  )
}
