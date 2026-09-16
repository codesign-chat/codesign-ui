import { Clipboard } from '@codesign-ui/solid/clipboard'
import { render, screen } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { CheckIcon, ClipboardCopyIcon } from 'lucide-solid'

const ComponentUnderTest = () => (
  <Clipboard.Root value="https://codesign.chat">
    <Clipboard.Label>Copy this link</Clipboard.Label>
    <Clipboard.Control>
      <Clipboard.Input />
      <Clipboard.Trigger>
        <Clipboard.Indicator copied={<CheckIcon />}>
          <ClipboardCopyIcon />
        </Clipboard.Indicator>
      </Clipboard.Trigger>
    </Clipboard.Control>
  </Clipboard.Root>
)

describe('Clipboard', () => {
  it('should copy the value into the clipboard', async () => {
    render(() => <ComponentUnderTest />)

    await user.click(screen.getByRole('button', { name: 'Copy to clipboard' }))
    expect(window.navigator.clipboard.writeText).toHaveBeenCalledWith('https://codesign.chat')
  })
})
