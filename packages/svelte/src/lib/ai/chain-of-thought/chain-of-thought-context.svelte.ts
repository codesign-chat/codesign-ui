import { getContext } from 'svelte'

export interface ChainOfThoughtContextValue {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export const chainOfThoughtKey: symbol = Symbol('chain-of-thought')

export function useChainOfThought(): ChainOfThoughtContextValue {
  const context = getContext<ChainOfThoughtContextValue>(chainOfThoughtKey)
  if (!context) {
    throw new Error('ChainOfThought components must be used within ChainOfThought')
  }
  return context
}
