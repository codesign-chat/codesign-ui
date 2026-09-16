import { forwardRef } from 'react'
import * as CodesignNumberInput from './primitives/number-input'

export interface NumberInputProps extends CodesignNumberInput.RootProps {}

export const NumberInput = forwardRef<HTMLDivElement, NumberInputProps>((props, ref) => {
  const { children, ...rootProps } = props
  return (
    <CodesignNumberInput.Root ref={ref} {...rootProps}>
      {children && <CodesignNumberInput.Label>{children}</CodesignNumberInput.Label>}
      <CodesignNumberInput.Control>
        <CodesignNumberInput.Input />
        <CodesignNumberInput.IncrementTrigger>
          <ChevronUpIcon />
        </CodesignNumberInput.IncrementTrigger>
        <CodesignNumberInput.DecrementTrigger>
          <ChevronDownIcon />
        </CodesignNumberInput.DecrementTrigger>
      </CodesignNumberInput.Control>
    </CodesignNumberInput.Root>
  )
})

NumberInput.displayName = 'NumberInput'

const ChevronUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <title>Chevron Up Icon</title>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m18 15l-6-6l-6 6"
    />
  </svg>
)

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <title>Chevron Down Icon</title>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m6 9l6 6l6-6"
    />
  </svg>
)
