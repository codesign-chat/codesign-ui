import { createEffect, createSignal, onCleanup, splitProps } from 'solid-js'
import type { JSX } from 'solid-js'
import { createContext } from '../../utils/create-context.ts'

const SCROLL_THRESHOLD = 80

interface ConversationContextValue {
  isAtBottom: boolean
  registerContent: (element: HTMLElement | undefined) => void
  scrollToBottom: () => void
}

const [ConversationProvider, useConversationContext] = createContext<ConversationContextValue>({
  hookName: 'useConversationContext',
  providerName: '<Conversation />',
})

export { useConversationContext }

export type ConversationProps = JSX.HTMLAttributes<HTMLDivElement> & {
  role?: 'log'
}

/**
 * Scroll container with native stick-to-bottom behavior: content growth keeps
 * the view pinned to the bottom until the user scrolls away. Mirrors the API
 * of the React port (which uses use-stick-to-bottom).
 */
export function Conversation(props: ConversationProps) {
  const [local, rest] = splitProps(props, ['role'])
  let scrollRef: HTMLDivElement | undefined
  const [isAtBottom, setIsAtBottom] = createSignal(true)

  const updateIsAtBottom = () => {
    if (!scrollRef) return
    const distance = scrollRef.scrollHeight - scrollRef.scrollTop - scrollRef.clientHeight
    setIsAtBottom(distance < SCROLL_THRESHOLD)
  }

  const scrollToBottom = () => {
    scrollRef?.scrollTo({ top: scrollRef.scrollHeight })
  }

  const scrollToBottomInstant = () => {
    if (scrollRef) scrollRef.scrollTop = scrollRef.scrollHeight
  }

  const [contentElement, setContentElement] = createSignal<HTMLElement | undefined>(undefined)

  createEffect(() => {
    const element = contentElement()
    if (!element) return
    const observer = new ResizeObserver(() => {
      if (isAtBottom()) {
        scrollToBottomInstant()
      }
      updateIsAtBottom()
    })
    observer.observe(element)
    onCleanup(() => observer.disconnect())
  })

  const contextValue: ConversationContextValue = {
    get isAtBottom() {
      return isAtBottom()
    },
    registerContent: setContentElement,
    scrollToBottom,
  }

  return (
    <ConversationProvider value={contextValue}>
      <div
        ref={scrollRef}
        data-scope="conversation"
        data-part="root"
        onScroll={updateIsAtBottom}
        role={local.role ?? 'log'}
        {...rest}
      >
        {props.children}
      </div>
    </ConversationProvider>
  )
}

export type ConversationContentProps = JSX.HTMLAttributes<HTMLDivElement>

export function ConversationContent(props: ConversationContentProps) {
  const { registerContent } = useConversationContext()
  return (
    <div
      ref={(element) => {
        registerContent(element)
        if (typeof props.ref === 'function') props.ref(element)
      }}
      data-scope="conversation"
      data-part="content"
      {...props}
    />
  )
}

export type ConversationEmptyStateProps = JSX.HTMLAttributes<HTMLDivElement> & {
  description?: string
  icon?: JSX.Element
  title?: string
}

export function ConversationEmptyState(props: ConversationEmptyStateProps) {
  const [local, rest] = splitProps(props, ['children', 'description', 'icon', 'title'])

  return (
    <div data-scope="conversation" data-part="empty-state" {...rest}>
      {local.children ?? (
        <>
          {local.icon && (
            <div data-scope="conversation" data-part="empty-state-icon">
              {local.icon}
            </div>
          )}
          <div data-scope="conversation" data-part="empty-state-title">
            {local.title ?? 'No messages yet'}
          </div>
          <div data-scope="conversation" data-part="empty-state-description">
            {local.description ?? 'Start a conversation to see messages here'}
          </div>
        </>
      )}
    </div>
  )
}

export type ConversationScrollToBottomProps = JSX.HTMLAttributes<HTMLButtonElement>

export function ConversationScrollToBottom(props: ConversationScrollToBottomProps) {
  const { isAtBottom, scrollToBottom } = useConversationContext()
  return (
    <button
      type="button"
      data-scope="conversation"
      data-part="scroll-to-bottom"
      data-state={isAtBottom ? 'at-bottom' : 'detached'}
      onClick={() => scrollToBottom()}
      {...props}
    />
  )
}
