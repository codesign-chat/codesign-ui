import { forwardRef } from 'react'
import { Input } from './input'
import * as CodesignPinInput from './primitives/pin-input'

export interface PinInputProps extends CodesignPinInput.RootProps {
  /**
   * The number of inputs to render.
   * @default 4
   */
  length?: number
}

export const PinInput = forwardRef<HTMLDivElement, PinInputProps>((props, ref) => {
  const { children, length = 4, ...rootProps } = props

  return (
    <CodesignPinInput.Root ref={ref} {...rootProps} placeholder="">
      {children && <CodesignPinInput.Label>{children}</CodesignPinInput.Label>}
      <CodesignPinInput.Control>
        {Array.from({ length }, (_, index) => index).map((id, index) => (
          <CodesignPinInput.Input key={id} index={index} asChild>
            <Input size={rootProps.size} />
          </CodesignPinInput.Input>
        ))}
      </CodesignPinInput.Control>
      <CodesignPinInput.HiddenInput />
    </CodesignPinInput.Root>
  )
})

PinInput.displayName = 'PinInput'
