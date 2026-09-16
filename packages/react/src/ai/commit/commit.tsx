import type { ComponentProps, HTMLAttributes, ReactNode } from 'react'
import { useCallback, useEffect, useState } from 'react'
import { Avatar } from '../../components/avatar/index.ts'
import { Collapsible } from '../../components/collapsible/index.ts'
import { useCopyToClipboard } from '../use-copy.ts'

export type CommitProps = ComponentProps<typeof Collapsible.Root>

export function Commit({ children, ...props }: CommitProps) {
  return (
    <Collapsible.Root data-scope="commit" data-part="root" {...props}>
      {children}
    </Collapsible.Root>
  )
}

export type CommitHeaderProps = Omit<ComponentProps<typeof Collapsible.Trigger>, 'onOpenChange'>

export function CommitHeader({ children, ...props }: CommitHeaderProps) {
  return (
    <Collapsible.Trigger asChild {...props}>
      <div data-scope="commit" data-part="header">
        {children}
      </div>
    </Collapsible.Trigger>
  )
}

export type CommitHashProps = HTMLAttributes<HTMLSpanElement>

export function CommitHash({ children, ...props }: CommitHashProps) {
  return (
    <span data-scope="commit" data-part="hash" {...props}>
      {children}
    </span>
  )
}

export type CommitMessageProps = HTMLAttributes<HTMLSpanElement>

export function CommitMessage(props: CommitMessageProps) {
  return <span data-scope="commit" data-part="message" {...props} />
}

export type CommitMetadataProps = HTMLAttributes<HTMLDivElement>

export function CommitMetadata(props: CommitMetadataProps) {
  return <div data-scope="commit" data-part="metadata" {...props} />
}

export type CommitSeparatorProps = HTMLAttributes<HTMLSpanElement>

export function CommitSeparator({ children, ...props }: CommitSeparatorProps) {
  return (
    <span data-scope="commit" data-part="separator" {...props}>
      {children ?? '•'}
    </span>
  )
}

export type CommitInfoProps = HTMLAttributes<HTMLDivElement>

export function CommitInfo(props: CommitInfoProps) {
  return <div data-scope="commit" data-part="info" {...props} />
}

export type CommitAuthorProps = HTMLAttributes<HTMLDivElement>

export function CommitAuthor(props: CommitAuthorProps) {
  return <div data-scope="commit" data-part="author" {...props} />
}

export type CommitAuthorAvatarProps = Omit<ComponentProps<typeof Avatar.Root>, 'children'> & {
  initials: string
}

export function CommitAuthorAvatar({ initials, ...props }: CommitAuthorAvatarProps) {
  return (
    <Avatar.Root data-scope="commit" data-part="author-avatar" {...props}>
      <Avatar.Fallback>{initials}</Avatar.Fallback>
    </Avatar.Root>
  )
}

export type CommitTimestampProps = HTMLAttributes<HTMLTimeElement> & {
  date: Date
}

const relativeTimeFormat = new Intl.RelativeTimeFormat('en', {
  numeric: 'auto',
})

const formatRelativeDate = (date: Date) => {
  const days = Math.round((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  return relativeTimeFormat.format(days, 'day')
}

export function CommitTimestamp({ date, children, ...props }: CommitTimestampProps) {
  const [formatted, setFormatted] = useState('')

  const updateFormatted = useCallback(() => {
    setFormatted(formatRelativeDate(date))
  }, [date])

  useEffect(() => {
    updateFormatted()
  }, [updateFormatted])

  return (
    <time data-scope="commit" data-part="timestamp" dateTime={date.toISOString()} {...props}>
      {children ?? formatted}
    </time>
  )
}

export type CommitActionsProps = HTMLAttributes<HTMLDivElement>

const handleActionsClick = (e: React.MouseEvent) => e.stopPropagation()
const handleActionsKeyDown = (e: React.KeyboardEvent) => e.stopPropagation()

export function CommitActions({ children, ...props }: CommitActionsProps) {
  return (
    <div
      data-scope="commit"
      data-part="actions"
      onClick={handleActionsClick}
      onKeyDown={handleActionsKeyDown}
      role="group"
      {...props}
    >
      {children}
    </div>
  )
}

export type CommitCopyButtonProps = Omit<ComponentProps<'button'>, 'children'> & {
  hash: string
  onCopy?: () => void
  onError?: (error: Error) => void
  timeout?: number
  children?: ReactNode | ((isCopied: boolean) => ReactNode)
}

export function CommitCopyButton({ hash, onCopy, onError, timeout, children, ...props }: CommitCopyButtonProps) {
  const { copy, isCopied } = useCopyToClipboard({ onCopy, onError, timeout })

  return (
    <button
      type="button"
      aria-label="Copy hash"
      data-scope="commit"
      data-part="copy-button"
      data-copied={isCopied || undefined}
      onClick={() => copy(hash)}
      {...props}
    >
      {typeof children === 'function' ? children(isCopied) : children}
    </button>
  )
}

export type CommitContentProps = ComponentProps<typeof Collapsible.Content>

export function CommitContent(props: CommitContentProps) {
  return <Collapsible.Content data-scope="commit" data-part="content" {...props} />
}

export type CommitFilesProps = HTMLAttributes<HTMLDivElement>

export function CommitFiles(props: CommitFilesProps) {
  return <div data-scope="commit" data-part="files" {...props} />
}

export type CommitFileProps = HTMLAttributes<HTMLDivElement>

export function CommitFile(props: CommitFileProps) {
  return <div data-scope="commit" data-part="file" {...props} />
}

export type CommitFileInfoProps = HTMLAttributes<HTMLDivElement>

export function CommitFileInfo(props: CommitFileInfoProps) {
  return <div data-scope="commit" data-part="file-info" {...props} />
}

export type CommitFileStatusProps = HTMLAttributes<HTMLSpanElement> & {
  status: 'added' | 'deleted' | 'modified' | 'renamed'
}

const fileStatusLabels = {
  added: 'A',
  deleted: 'D',
  modified: 'M',
  renamed: 'R',
}

export function CommitFileStatus({ status, children, ...props }: CommitFileStatusProps) {
  return (
    <span data-scope="commit" data-part="file-status" data-status={status} {...props}>
      {children ?? fileStatusLabels[status]}
    </span>
  )
}

export type CommitFilePathProps = HTMLAttributes<HTMLSpanElement>

export function CommitFilePath(props: CommitFilePathProps) {
  return <span data-scope="commit" data-part="file-path" {...props} />
}

export type CommitFileChangesProps = HTMLAttributes<HTMLDivElement>

export function CommitFileChanges(props: CommitFileChangesProps) {
  return <div data-scope="commit" data-part="file-changes" {...props} />
}

export type CommitFileAdditionsProps = HTMLAttributes<HTMLSpanElement> & {
  count: number
}

export function CommitFileAdditions({ count, children, ...props }: CommitFileAdditionsProps) {
  if (count <= 0) {
    return null
  }

  return (
    <span data-scope="commit" data-part="file-additions" {...props}>
      {children ?? `+${count}`}
    </span>
  )
}

export type CommitFileDeletionsProps = HTMLAttributes<HTMLSpanElement> & {
  count: number
}

export function CommitFileDeletions({ count, children, ...props }: CommitFileDeletionsProps) {
  if (count <= 0) {
    return null
  }

  return (
    <span data-scope="commit" data-part="file-deletions" {...props}>
      {children ?? `-${count}`}
    </span>
  )
}
