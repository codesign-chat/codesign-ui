import type { ComponentProps, FormEvent } from 'react'
import { createContext, useCallback, useContext } from 'react'
import { useControllableState } from '../use-controllable-state.ts'

const SCOPE = 'question'

export interface QuestionValue {
  selectedValues: readonly string[]
  text: string
}

export interface QuestionResponse {
  selectedValues: readonly string[]
  text?: string
}

type SelectionMode = 'multiple' | 'single'

interface QuestionContextValue {
  disabled: boolean
  selectedValues: readonly string[]
  selectionMode: SelectionMode
  setText: (text: string) => void
  text: string
  toggleValue: (value: string) => void
}

const QuestionContext = createContext<QuestionContextValue | null>(null)

function useQuestion() {
  const context = useContext(QuestionContext)
  if (!context) {
    throw new Error('Question components must be used within Question')
  }
  return context
}

const EMPTY_VALUE: QuestionValue = { selectedValues: [], text: '' }

function getSelectedValues(
  currentValues: readonly string[],
  optionValue: string,
  selectionMode: SelectionMode,
): readonly string[] {
  const isSelected = currentValues.includes(optionValue)

  if (selectionMode === 'single') {
    return isSelected ? [] : [optionValue]
  }

  if (isSelected) {
    return currentValues.filter((item) => item !== optionValue)
  }

  return [...currentValues, optionValue]
}

export type QuestionProps = Omit<ComponentProps<'form'>, 'defaultValue' | 'onChange' | 'onSubmit' | 'value'> & {
  defaultValue?: QuestionValue
  disabled?: boolean
  onValueChange?: (value: QuestionValue) => void
  onSubmit?: (response: QuestionResponse, event: FormEvent<HTMLFormElement>) => void | Promise<void>
  selectionMode?: SelectionMode
  value?: QuestionValue
}

export function Question({
  defaultValue = EMPTY_VALUE,
  disabled = false,
  onValueChange,
  onSubmit,
  selectionMode = 'single',
  value: controlledValue,
  children,
  ...props
}: QuestionProps) {
  const [internalValue, setValue] = useControllableState({
    defaultValue,
    onChange: onValueChange,
    value: controlledValue,
  })

  const toggleValue = useCallback(
    (optionValue: string) => {
      setValue({
        selectedValues: getSelectedValues(internalValue.selectedValues, optionValue, selectionMode),
        text: internalValue.text,
      })
    },
    [internalValue, selectionMode, setValue],
  )

  const setText = useCallback(
    (text: string) => {
      setValue({ selectedValues: internalValue.selectedValues, text })
    },
    [internalValue, setValue],
  )

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit?.({ selectedValues: internalValue.selectedValues, text: internalValue.text || undefined }, event)
  }

  return (
    <QuestionContext.Provider value={{ disabled, selectionMode, setText, toggleValue, ...internalValue }}>
      <form data-scope={SCOPE} data-part="root" onSubmit={handleSubmit} {...props}>
        {children}
      </form>
    </QuestionContext.Provider>
  )
}

export type QuestionPromptProps = ComponentProps<'p'>

export function QuestionPrompt(props: QuestionPromptProps) {
  return <p data-scope={SCOPE} data-part="prompt" {...props} />
}

export type QuestionDescriptionProps = ComponentProps<'p'>

export function QuestionDescription(props: QuestionDescriptionProps) {
  return <p data-scope={SCOPE} data-part="description" {...props} />
}

export type QuestionOptionsProps = ComponentProps<'div'>

export function QuestionOptions({ role, ...props }: QuestionOptionsProps) {
  const { selectionMode } = useQuestion()

  return (
    <div
      data-scope={SCOPE}
      data-part="options"
      role={role ?? (selectionMode === 'single' ? 'radiogroup' : 'group')}
      {...props}
    />
  )
}

export type QuestionOptionProps = ComponentProps<'button'> & { value: string }

export function QuestionOption({ value, onClick, ...props }: QuestionOptionProps) {
  const { disabled, selectedValues, selectionMode, toggleValue } = useQuestion()
  const selected = selectedValues.includes(value)

  return (
    // biome-ignore lint/a11y/useAriaPropsSupportedByRole: role is 'radio' or 'checkbox' depending on selectionMode, and both support aria-checked
    <button
      aria-checked={selected}
      data-scope={SCOPE}
      data-part="option"
      data-selected={selected}
      disabled={disabled}
      onClick={(event) => {
        onClick?.(event)
        toggleValue(value)
      }}
      role={selectionMode === 'single' ? 'radio' : 'checkbox'}
      type="button"
      {...props}
    />
  )
}

export type QuestionInputProps = Omit<ComponentProps<'textarea'>, 'onChange' | 'value'> & {
  placeholder?: string
}

export function QuestionInput({ placeholder = 'Add a comment…', ...props }: QuestionInputProps) {
  const { disabled, setText, text } = useQuestion()

  return (
    <textarea
      data-scope={SCOPE}
      data-part="input"
      disabled={disabled}
      onChange={(event) => setText(event.target.value)}
      placeholder={placeholder}
      value={text}
      {...props}
    />
  )
}

export type QuestionActionsProps = ComponentProps<'div'>

export function QuestionActions(props: QuestionActionsProps) {
  return <div data-scope={SCOPE} data-part="actions" {...props} />
}

export type QuestionSubmitProps = ComponentProps<'button'>

export function QuestionSubmit({ children = 'Submit', disabled, ...props }: QuestionSubmitProps) {
  const { disabled: rootDisabled, selectedValues, text } = useQuestion()
  const empty = selectedValues.length === 0 && text.trim() === ''

  return (
    <button
      data-scope={SCOPE}
      data-part="submit"
      disabled={disabled ?? (rootDisabled || empty)}
      type="submit"
      {...props}
    >
      {children}
    </button>
  )
}
