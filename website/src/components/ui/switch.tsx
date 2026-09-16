import { forwardRef } from 'react'
import * as CodesignSwitch from './primitives/switch'

export interface SwitchProps extends CodesignSwitch.RootProps {}

export const Switch = forwardRef<HTMLLabelElement, SwitchProps>((props, ref) => {
  const { children, ...rootProps } = props

  return (
    <CodesignSwitch.Root ref={ref} {...rootProps}>
      <CodesignSwitch.Control>
        <CodesignSwitch.Thumb />
      </CodesignSwitch.Control>
      {children && <CodesignSwitch.Label>{children}</CodesignSwitch.Label>}
      <CodesignSwitch.HiddenInput />
    </CodesignSwitch.Root>
  )
})

Switch.displayName = 'Switch'
