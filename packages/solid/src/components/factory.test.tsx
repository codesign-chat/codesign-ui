import { render, screen } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { codesign } from './factory.tsx'

const ComponentUnderTest = () => (
  <codesign.div
    id="parent"
    data-part="parent"
    data-testid="parent"
    class="parent"
    style={{ background: 'red' }}
    asChild={(props) => (
      <codesign.span
        {...props({ id: 'child', class: 'child', style: { color: 'blue' } })}
        data-part="child"
        data-testid="child"
      >
        Child
      </codesign.span>
    )}
  >
    Parent
  </codesign.div>
)

describe('Codesign Factory', () => {
  it('should render only the child', () => {
    render(() => <ComponentUnderTest />)
    expect(screen.getByText('Child')).toBeVisible()
  })

  it('should merge styles', () => {
    render(() => <ComponentUnderTest />)
    expect(screen.getByText('Child')).toHaveStyle({ color: 'rgb(0, 0, 255)', background: 'red' })
  })

  it('should merge classes', () => {
    render(() => <ComponentUnderTest />)
    expect(screen.getByText('Child')).toHaveClass('child parent')
  })

  it('should merge events', async () => {
    const onClickParent = vi.fn()
    const onClickChild = vi.fn()
    render(() => (
      <codesign.div
        data-testid="parent"
        onClick={onClickParent}
        asChild={(props) => <codesign.span {...props({ onClick: onClickChild })} data-testid="child" />}
      >
        Parent
      </codesign.div>
    ))
    await user.click(screen.getByTestId('child'))
    expect(onClickParent).toHaveBeenCalled()
    expect(onClickChild).toHaveBeenCalled()
  })

  it('should stop propagate asChild', async () => {
    render(() => (
      <codesign.div
        data-testid="parent"
        asChild={(props) => (
          <codesign.span {...props()}>
            <codesign.span>Child</codesign.span>
          </codesign.span>
        )}
      >
        Parent
      </codesign.div>
    ))
    expect(screen.getByText('Child')).not.toHaveAttribute('data-testid', 'parent')
  })
})
