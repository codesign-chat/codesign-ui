import type { ComponentProps, HTMLAttributes, ReactNode } from 'react'
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { Switch } from '../../components/switch/index.ts'
import { useCopyToClipboard } from '../use-copy.ts'

interface EnvironmentVariablesContextType {
  showValues: boolean
  setShowValues: (show: boolean) => void
}

const EnvironmentVariablesContext = createContext<EnvironmentVariablesContextType>({
  setShowValues: () => {},
  showValues: false,
})

export type EnvironmentVariablesProps = HTMLAttributes<HTMLDivElement> & {
  showValues?: boolean
  defaultShowValues?: boolean
  onShowValuesChange?: (show: boolean) => void
}

export function EnvironmentVariables({
  showValues: controlledShowValues,
  defaultShowValues = false,
  onShowValuesChange,
  children,
  ...props
}: EnvironmentVariablesProps) {
  const [internalShowValues, setInternalShowValues] = useState(defaultShowValues)
  const showValues = controlledShowValues ?? internalShowValues

  const setShowValues = useCallback(
    (show: boolean) => {
      setInternalShowValues(show)
      onShowValuesChange?.(show)
    },
    [onShowValuesChange],
  )

  const contextValue = useMemo(() => ({ setShowValues, showValues }), [setShowValues, showValues])

  return (
    <EnvironmentVariablesContext.Provider value={contextValue}>
      <div data-scope="env-vars" data-part="root" {...props}>
        {children}
      </div>
    </EnvironmentVariablesContext.Provider>
  )
}

export type EnvironmentVariablesHeaderProps = HTMLAttributes<HTMLDivElement>

export function EnvironmentVariablesHeader(props: EnvironmentVariablesHeaderProps) {
  return <div data-scope="env-vars" data-part="header" {...props} />
}

export type EnvironmentVariablesTitleProps = HTMLAttributes<HTMLHeadingElement>

export function EnvironmentVariablesTitle({ children, ...props }: EnvironmentVariablesTitleProps) {
  return (
    <h3 data-scope="env-vars" data-part="title" {...props}>
      {children ?? 'Environment Variables'}
    </h3>
  )
}

export type EnvironmentVariablesToggleProps = HTMLAttributes<HTMLDivElement> & {
  toggleIcon?: ReactNode
}

export function EnvironmentVariablesToggle({ toggleIcon, ...props }: EnvironmentVariablesToggleProps) {
  const { setShowValues, showValues } = useContext(EnvironmentVariablesContext)

  return (
    <div data-scope="env-vars" data-part="toggle" {...props}>
      <span data-scope="env-vars" data-part="toggle-icon">
        {showValues ? toggleIcon : null}
      </span>
      <Switch.Root
        aria-label="Toggle value visibility"
        checked={showValues}
        onCheckedChange={(details) => setShowValues(details.checked)}
      />
    </div>
  )
}

export type EnvironmentVariablesContentProps = HTMLAttributes<HTMLDivElement>

export function EnvironmentVariablesContent(props: EnvironmentVariablesContentProps) {
  return <div data-scope="env-vars" data-part="content" {...props} />
}

interface EnvironmentVariableContextType {
  name: string
  value: string
}

const EnvironmentVariableContext = createContext<EnvironmentVariableContextType>({
  name: '',
  value: '',
})

export type EnvironmentVariableGroupProps = HTMLAttributes<HTMLDivElement>

export function EnvironmentVariableGroup(props: EnvironmentVariableGroupProps) {
  return <div data-scope="env-vars" data-part="group" {...props} />
}

export type EnvironmentVariableNameProps = HTMLAttributes<HTMLSpanElement>

export function EnvironmentVariableName({ children, ...props }: EnvironmentVariableNameProps) {
  const { name } = useContext(EnvironmentVariableContext)

  return (
    <span data-scope="env-vars" data-part="name" {...props}>
      {children ?? name}
    </span>
  )
}

export type EnvironmentVariableValueProps = HTMLAttributes<HTMLSpanElement>

export function EnvironmentVariableValue({ children, ...props }: EnvironmentVariableValueProps) {
  const { value } = useContext(EnvironmentVariableContext)
  const { showValues } = useContext(EnvironmentVariablesContext)

  const displayValue = showValues ? value : '•'.repeat(Math.min(value.length, 20))

  return (
    <span data-scope="env-vars" data-part="value" data-hidden={!showValues || undefined} {...props}>
      {children ?? displayValue}
    </span>
  )
}

export type EnvironmentVariableProps = HTMLAttributes<HTMLDivElement> & {
  name: string
  value: string
}

export function EnvironmentVariable({ name, value, children, ...props }: EnvironmentVariableProps) {
  const envVarContextValue = useMemo(() => ({ name, value }), [name, value])

  return (
    <EnvironmentVariableContext.Provider value={envVarContextValue}>
      <div data-scope="env-vars" data-part="variable" {...props}>
        {children ?? (
          <>
            <EnvironmentVariableGroup>
              <EnvironmentVariableName />
            </EnvironmentVariableGroup>
            <EnvironmentVariableValue />
          </>
        )}
      </div>
    </EnvironmentVariableContext.Provider>
  )
}

export type EnvironmentVariableCopyButtonProps = Omit<ComponentProps<'button'>, 'children'> & {
  onCopy?: () => void
  onError?: (error: Error) => void
  timeout?: number
  copyFormat?: 'export' | 'name' | 'value'
  children?: ReactNode | ((isCopied: boolean) => ReactNode)
}

export function EnvironmentVariableCopyButton({
  onCopy,
  onError,
  timeout,
  copyFormat = 'value',
  children,
  ...props
}: EnvironmentVariableCopyButtonProps) {
  const { name, value } = useContext(EnvironmentVariableContext)
  const { copy, isCopied } = useCopyToClipboard({ onCopy, onError, timeout })

  const getTextToCopy = useCallback((): string => {
    const formatMap = {
      export: () => `export ${name}="${value}"`,
      name: () => name,
      value: () => value,
    }
    return formatMap[copyFormat]()
  }, [name, value, copyFormat])

  return (
    <button
      type="button"
      aria-label="Copy"
      data-scope="env-vars"
      data-part="copy-button"
      data-copied={isCopied || undefined}
      onClick={() => copy(getTextToCopy())}
      {...props}
    >
      {typeof children === 'function' ? children(isCopied) : children}
    </button>
  )
}

export type EnvironmentVariableRequiredProps = ComponentProps<'span'>

export function EnvironmentVariableRequired({ children, ...props }: EnvironmentVariableRequiredProps) {
  return (
    <span data-scope="env-vars" data-part="required" {...props}>
      {children ?? 'Required'}
    </span>
  )
}
