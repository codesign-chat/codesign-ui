import user from '@testing-library/user-event'
import { render, screen } from '@testing-library/vue'
import { createCommentVNode, defineComponent, h, nextTick, ref } from 'vue'
import { codesign } from './factory.ts'

const ComponentUnderTest = (
  <codesign.div id="parent" data-part="parent" data-testid="parent" className="parent" style={{ background: 'red' }} asChild>
    <codesign.span id="child" data-part="child" data-testid="child" className="child" style={{ color: 'blue' }}>
      Codesign UI
    </codesign.span>
  </codesign.div>
)

describe('Factory', () => {
  it('should render only the child', () => {
    render(ComponentUnderTest)

    expect(() => screen.getByTestId('parent')).toThrow()
    expect(screen.getByTestId('child')).toBeVisible()
  })

  it('should override existing props', () => {
    render(ComponentUnderTest)
    const child = screen.getByTestId('child')
    expect(child.id).toBe('child')
    expect(child.dataset.part).toBe('child')
  })

  it('should merge styles and classes', () => {
    render(ComponentUnderTest)
    const child = screen.getByTestId('child')
    expect(child).toHaveStyle({ background: 'red' })
    expect(child).toHaveClass('child parent')
    expect(screen.getByText('Codesign UI')).toBeVisible()
  })

  it('should not duplicate the class of a plain child element', () => {
    render(
      <codesign.div class="parent" asChild>
        <span data-testid="child" class="child">
          Codesign UI
        </span>
      </codesign.div>,
    )
    const child = screen.getByTestId('child')
    expect(child.className.split(/\s+/).filter(Boolean).sort()).toEqual(['child', 'parent'])
  })

  it('should call each handler of a plain child element once', async () => {
    const onClickParent = vi.fn()
    const onClickChild = vi.fn()
    render(
      <codesign.div onClick={onClickParent} asChild>
        <button type="button" data-testid="child" onClick={onClickChild} />
      </codesign.div>,
    )
    await user.click(screen.getByTestId('child'))
    expect(onClickParent).toHaveBeenCalledTimes(1)
    expect(onClickChild).toHaveBeenCalledTimes(1)
  })

  it('should apply props to the first non-comment child', () => {
    render(
      defineComponent({
        setup: () => () =>
          h(codesign.div, { class: 'parent', asChild: true }, () => [
            createCommentVNode('placeholder'),
            h('span', { 'data-testid': 'child', class: 'child' }, 'Codesign UI'),
          ]),
      }),
    )
    const child = screen.getByTestId('child')
    expect(child.className.split(/\s+/).filter(Boolean).sort()).toEqual(['child', 'parent'])
  })

  it('should patch reactive props onto the same child element', async () => {
    const parentClass = ref('a')
    const { container } = render(
      defineComponent({
        setup: () => () =>
          h(codesign.div, { class: parentClass.value, asChild: true }, () => [
            h('span', { 'data-testid': 'child', class: 'child' }, 'Codesign UI'),
          ]),
      }),
    )
    const before = screen.getByTestId('child')
    expect(before.className.split(/\s+/).filter(Boolean).sort()).toEqual(['a', 'child'])

    parentClass.value = 'b'
    await nextTick()

    const after = container.querySelector('[data-testid="child"]')
    expect(after).toBe(before)
    expect(after?.className.split(/\s+/).filter(Boolean).sort()).toEqual(['b', 'child'])
  })

  it('should render comment-only children untouched', () => {
    const { container } = render(
      defineComponent({
        setup: () => () => h(codesign.div, { class: 'parent', asChild: true }, () => [createCommentVNode('v-if')]),
      }),
    )
    expect(container.innerHTML).toBe('<!--v-if-->')
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
})
