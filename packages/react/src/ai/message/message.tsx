import type { UIMessage } from 'ai'
import type { ComponentProps, HTMLAttributes, ReactElement } from 'react'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Tooltip } from '../../components/tooltip/index.ts'

export type MessageProps = HTMLAttributes<HTMLDivElement> & {
  from: UIMessage['role']
}

export function Message({ from, ...props }: MessageProps) {
  return <div data-scope="message" data-part="root" data-role={from} {...props} />
}

export type MessageContentProps = HTMLAttributes<HTMLDivElement>

export function MessageContent(props: MessageContentProps) {
  return <div data-scope="message" data-part="content" {...props} />
}

export type MessageActionsProps = HTMLAttributes<HTMLDivElement>

export function MessageActions(props: MessageActionsProps) {
  return <div data-scope="message" data-part="actions" {...props} />
}

export type MessageActionProps = ComponentProps<'button'> & {
  tooltip?: string
  label?: string
}

export function MessageAction({ tooltip, label, ...props }: MessageActionProps) {
  const ariaLabel = label ?? tooltip
  const button = <button type="button" data-scope="message" data-part="action" aria-label={ariaLabel} {...props} />

  if (!tooltip) {
    return button
  }

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>{button}</Tooltip.Trigger>
      <Tooltip.Positioner>
        <Tooltip.Content data-scope="message" data-part="action-tooltip">
          {tooltip}
        </Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  )
}

export type MessageToolbarProps = HTMLAttributes<HTMLDivElement>

export function MessageToolbar(props: MessageToolbarProps) {
  return <div data-scope="message" data-part="toolbar" {...props} />
}

interface MessageBranchContextValue {
  currentBranch: number
  totalBranches: number
  goToPrevious: () => void
  goToNext: () => void
  branches: ReactElement[]
  setBranches: (branches: ReactElement[]) => void
}

const MessageBranchContext = createContext<MessageBranchContextValue | null>(null)

function useMessageBranch() {
  const context = useContext(MessageBranchContext)

  if (!context) {
    throw new Error('MessageBranch components must be used within MessageBranch')
  }

  return context
}

export type MessageBranchProps = HTMLAttributes<HTMLDivElement> & {
  defaultBranch?: number
  onBranchChange?: (branchIndex: number) => void
}

export function MessageBranch({ defaultBranch = 0, onBranchChange, ...props }: MessageBranchProps) {
  const [currentBranch, setCurrentBranch] = useState(defaultBranch)
  const [branches, setBranches] = useState<ReactElement[]>([])

  const handleBranchChange = useCallback(
    (newBranch: number) => {
      setCurrentBranch(newBranch)
      onBranchChange?.(newBranch)
    },
    [onBranchChange],
  )

  const goToPrevious = useCallback(() => {
    const newBranch = currentBranch > 0 ? currentBranch - 1 : branches.length - 1
    handleBranchChange(newBranch)
  }, [currentBranch, branches.length, handleBranchChange])

  const goToNext = useCallback(() => {
    const newBranch = currentBranch < branches.length - 1 ? currentBranch + 1 : 0
    handleBranchChange(newBranch)
  }, [currentBranch, branches.length, handleBranchChange])

  const contextValue = useMemo<MessageBranchContextValue>(
    () => ({
      branches,
      currentBranch,
      goToNext,
      goToPrevious,
      setBranches,
      totalBranches: branches.length,
    }),
    [branches, currentBranch, goToNext, goToPrevious],
  )

  return (
    <MessageBranchContext.Provider value={contextValue}>
      <div data-scope="message" data-part="branch" {...props} />
    </MessageBranchContext.Provider>
  )
}

export type MessageBranchContentProps = HTMLAttributes<HTMLDivElement>

export function MessageBranchContent(props: MessageBranchContentProps) {
  const { currentBranch, setBranches, branches } = useMessageBranch()
  const childrenArray = useMemo(
    () => (Array.isArray(props.children) ? props.children : [props.children]),
    [props.children],
  )

  useEffect(() => {
    if (branches.length !== childrenArray.length) {
      setBranches(childrenArray as ReactElement[])
    }
  }, [childrenArray, branches, setBranches])

  return childrenArray.map((branch, index) => (
    <div
      data-scope="message"
      data-part="branch-content"
      data-state={index === currentBranch ? 'selected' : 'hidden'}
      hidden={index !== currentBranch}
      key={index}
      {...props}
    >
      {branch}
    </div>
  ))
}

export type MessageBranchSelectorProps = HTMLAttributes<HTMLDivElement>

export function MessageBranchSelector(props: MessageBranchSelectorProps) {
  const { totalBranches } = useMessageBranch()

  if (totalBranches <= 1) {
    return null
  }

  return <div data-scope="message" data-part="branch-selector" {...props} />
}

export type MessageBranchPreviousProps = ComponentProps<'button'>

export function MessageBranchPrevious({ children, ...props }: MessageBranchPreviousProps) {
  const { goToPrevious, totalBranches } = useMessageBranch()

  return (
    <button
      type="button"
      aria-label="Previous branch"
      data-scope="message"
      data-part="branch-previous"
      disabled={totalBranches <= 1}
      onClick={goToPrevious}
      {...props}
    >
      {children}
    </button>
  )
}

export type MessageBranchNextProps = ComponentProps<'button'>

export function MessageBranchNext({ children, ...props }: MessageBranchNextProps) {
  const { goToNext, totalBranches } = useMessageBranch()

  return (
    <button
      type="button"
      aria-label="Next branch"
      data-scope="message"
      data-part="branch-next"
      disabled={totalBranches <= 1}
      onClick={goToNext}
      {...props}
    >
      {children}
    </button>
  )
}

export type MessageBranchPageProps = HTMLAttributes<HTMLSpanElement>

export function MessageBranchPage(props: MessageBranchPageProps) {
  const { currentBranch, totalBranches } = useMessageBranch()

  return (
    <span data-scope="message" data-part="branch-page" {...props}>
      {currentBranch + 1} of {totalBranches}
    </span>
  )
}
