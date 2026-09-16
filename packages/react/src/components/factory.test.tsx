import { act, render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { Suspense, type ReactElement, type ReactNode, isValidElement, useCallback, useReducer } from 'react'
import { codesign } from './factory.ts'

const ComponentUnderTest = () => (
  <codesign.div
    id="parent"
    data-part="parent"
    data-testid="parent"
    className="parent"
    style={{ background: 'red' }}
    asChild
  >
    <codesign.span id="child" data-part="child" data-testid="child" className="child" style={{ color: 'blue' }}>
      Codesign UI
    </codesign.span>
  </codesign.div>
)

describe('Codesign Factory', () => {
  it('should render only the child', () => {
    render(<ComponentUnderTest />)

    expect(screen.queryByTestId('parent')).toBeNull()
    expect(screen.getByTestId('child')).toBeVisible()
  })

  it('should override existing props', () => {
    render(<ComponentUnderTest />)
    const child = screen.getByTestId('child')
    expect(child.id).toBe('child')
    // biome-ignore lint/complexity/useLiteralKeys: intentional
    expect(child.dataset['part']).toBe('child')
  })

  it('should merge styles and classes', () => {
    render(<ComponentUnderTest />)
    const child = screen.getByTestId('child')
    expect(child).toHaveStyle({ background: 'red' })
    expect(child).toHaveStyle({ color: 'blue' })
    expect(child).toHaveClass('child parent')
    expect(screen.getByText('Codesign UI')).toBeVisible()
  })

  it('should merge events', async () => {
    const onClickParent = vi.fn()
    const onClickChild = vi.fn()
    render(
      <codesign.div data-testid="parent" onClick={onClickParent} asChild>
        <codesign.span data-testid="child" onClick={onClickChild} />
      </codesign.div>,
    )
    await user.click(screen.getByTestId('child'))
    expect(onClickParent).toHaveBeenCalled()
    expect(onClickChild).toHaveBeenCalled()
  })

  it('should propagate asChild', async () => {
    render(
      <codesign.div data-testid="parent" asChild>
        <codesign.span asChild>
          <codesign.span>Codesign UI</codesign.span>
        </codesign.span>
      </codesign.div>,
    )
    expect(screen.getByText('Codesign UI')).toHaveAttribute('data-testid', 'parent')
  })

  it('should stop propagate asChild', async () => {
    render(
      <codesign.div data-testid="parent" asChild>
        <codesign.span asChild={false}>
          <codesign.span>Codesign UI</codesign.span>
        </codesign.span>
      </codesign.div>,
    )
    expect(screen.getByText('Codesign UI')).not.toHaveAttribute('data-testid', 'parent')
  })

  it('should not detach stable asChild callback ref on parent re-render', async () => {
    const callbackRef = vi.fn()

    const AsChildTest = () => {
      const [, rerender] = useReducer((count) => count + 1, 0)
      const setRef = useCallback((node: HTMLSpanElement | null) => {
        callbackRef(node)
      }, [])

      return (
        <>
          <codesign.span ref={setRef} asChild>
            <span data-testid="child">Codesign UI</span>
          </codesign.span>
          <button type="button" onClick={() => rerender()}>
            re-render
          </button>
        </>
      )
    }

    render(<AsChildTest />)
    expect(callbackRef).toHaveBeenCalledWith(screen.getByTestId('child'))

    const callsAfterMount = callbackRef.mock.calls.length
    await user.click(screen.getByRole('button', { name: /re-render/i }))

    expect(callbackRef).toHaveBeenCalledTimes(callsAfterMount)
  })

  interface FlightChunk {
    status: 'pending' | 'fulfilled'
    value: ReactElement | null
    listeners: (() => void)[]
    then(onFulfill: () => void): void
  }

  function createChunk(status: FlightChunk['status'], value: ReactElement | null): FlightChunk {
    return {
      status,
      value,
      listeners: [],
      // biome-ignore lint/suspicious/noThenProperty: a Flight chunk is intentionally thenable
      then(onFulfill) {
        this.listeners.push(onFulfill)
      },
    }
  }

  function readChunk(chunk: FlightChunk) {
    if (chunk.status === 'fulfilled') return chunk.value
    throw chunk
  }

  function toLazy(chunk: FlightChunk): ReactNode {
    return { $$typeof: Symbol.for('react.lazy'), _payload: chunk, _init: readChunk } as unknown as ReactNode
  }

  function createLazyChild(element: ReactElement): ReactNode {
    return toLazy(createChunk('fulfilled', element))
  }

  function createPendingLazyChild(element: ReactElement) {
    const chunk = createChunk('pending', null)
    const resolve = () => {
      chunk.status = 'fulfilled'
      chunk.value = element
      for (const listener of chunk.listeners) listener()
    }
    return [toLazy(chunk), resolve] as const
  }

  it('should unwrap a react.lazy child from the RSC flight protocol', () => {
    const lazyChild = createLazyChild(
      <span data-testid="child" className="child" style={{ color: 'blue' }}>
        Codesign UI
      </span>,
    )

    expect(isValidElement(lazyChild)).toBe(false)

    const { container } = render(
      <codesign.div data-testid="parent" className="parent" style={{ background: 'red' }} asChild>
        {lazyChild}
      </codesign.div>,
    )

    expect(container.querySelector('div')).toBeNull()

    const child = screen.getByTestId('child')
    expect(child).toBeVisible()
    expect(child).toHaveClass('child parent')
    expect(child).toHaveStyle({ background: 'red' })
    expect(child).toHaveStyle({ color: 'blue' })
    expect(child).toHaveTextContent('Codesign UI')
  })

  it('should suspend until a pending react.lazy child resolves', async () => {
    const [lazyChild, resolve] = createPendingLazyChild(<span data-testid="child">Codesign UI</span>)

    render(
      <Suspense fallback={<span data-testid="fallback">loading</span>}>
        <codesign.div data-part="parent" asChild>
          {lazyChild}
        </codesign.div>
      </Suspense>,
    )

    expect(screen.getByTestId('fallback')).toBeVisible()
    expect(screen.queryByTestId('child')).toBeNull()

    await act(async () => resolve())

    const child = await screen.findByTestId('child')
    expect(child).toHaveAttribute('data-part', 'parent')
    expect(child).toHaveTextContent('Codesign UI')
  })

  it('should compose refs through a react.lazy child', () => {
    const parentRef = vi.fn()
    const childRef = vi.fn()

    render(
      <codesign.div ref={parentRef} data-part="parent" asChild>
        {createLazyChild(<span ref={childRef} data-testid="child" />)}
      </codesign.div>,
    )

    const child = screen.getByTestId('child')
    expect(child).toHaveAttribute('data-part', 'parent')
    expect(parentRef).toHaveBeenCalledWith(child)
    expect(childRef).toHaveBeenCalledWith(child)
  })

  it('should leave non-lazy invalid children untouched', () => {
    const { container } = render(
      <codesign.div data-testid="parent" asChild>
        <span data-testid="first" />
        <span data-testid="second" />
      </codesign.div>,
    )

    expect(container.firstChild).toBeNull()
  })

  it('should render nothing when asChild has no valid child', () => {
    const { container } = render(<codesign.div asChild>text</codesign.div>)
    expect(container.firstChild).toBeNull()
  })
})
