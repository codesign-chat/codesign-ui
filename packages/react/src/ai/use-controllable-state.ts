import { useCallback, useState } from 'react'

export interface UseControllableStateOptions<T> {
  value?: T | undefined
  defaultValue: T
  onChange?: (value: T) => void
}

/**
 * Minimal controlled/uncontrolled state hook. When `value` is provided the
 * state is controlled and updates flow through `onChange`; otherwise the
 * internal state is used. Zag machines already do this internally — this hook
 * is for composites that need the value for their own effects.
 */
export function useControllableState<T>(options: UseControllableStateOptions<T>) {
  const { value, defaultValue, onChange } = options
  const [internal, setInternal] = useState(defaultValue)
  const isControlled = value !== undefined
  const state = isControlled ? value : internal
  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) {
        setInternal(next)
      }
      onChange?.(next)
    },
    [isControlled, onChange],
  )
  return [state, setValue] as const
}
