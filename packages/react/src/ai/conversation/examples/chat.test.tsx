import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import ResizeObserver from 'resize-observer-polyfill'
import { Chat } from './chat.tsx'

if (typeof globalThis.ResizeObserver === 'undefined') {
  ;(globalThis as unknown as { ResizeObserver: typeof ResizeObserver }).ResizeObserver = ResizeObserver
}

describe('Chat composition', () => {
  it('shows the empty state, sends a message, and streams an assistant reply', async () => {
    const user = userEvent.setup()
    render(<Chat />)

    expect(screen.getByText('No messages yet')).toBeDefined()

    await user.type(screen.getByPlaceholderText('Ask anything…'), 'Hello there')
    await user.click(screen.getByRole('button', { name: 'Submit' }))

    expect(screen.getByText('Hello there')).toBeDefined()

    // The fake stream types out the reply progressively; wait for the tail.
    await waitFor(
      () => {
        expect(
          screen.getByText((_, element) => {
            const el = element as HTMLElement | null
            return (
              el?.dataset?.scope === 'message' &&
              el.dataset.part === 'content' &&
              (el.textContent ?? '').includes('the library brings behavior')
            )
          }),
        ).toBeDefined()
      },
      { timeout: 8000 },
    )

    // Streaming finished: submit button is back to its ready label.
    // The status flush may land one frame after the final text update.
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Submit' })).toBeDefined()
    })
  }, 20_000)
})
