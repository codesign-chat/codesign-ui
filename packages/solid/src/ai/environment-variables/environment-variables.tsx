import { Show, createContext, createSignal, splitProps, useContext } from 'solid-js'
import type { JSX } from 'solid-js'
import { Switch } from '../../components/switch/index.ts'

const SCOPE = 'env-vars'

interface EnvironmentVariablesContextValue {
  setShowValues: (show: boolean) => void
  showValues: boolean
}

const EnvironmentVariablesContext = createContext<EnvironmentVariablesContextValue>()

export function useEnvironmentVariables(): EnvironmentVariablesContextValue {
  const context = useContext(EnvironmentVariablesContext)
  if (!context) {
    throw new Error('EnvironmentVariables components must be used within EnvironmentVariables')
  }
  return context
}

export type EnvironmentVariablesProps = JSX.HTMLAttributes<HTMLDivElement> & {
  defaultShowValues?: boolean
  onShowValuesChange?: (show: boolean) => void
  showValues?: boolean
}

export function EnvironmentVariables(props: EnvironmentVariablesProps) {
  const [local, rest] = splitProps(props, ['defaultShowValues', 'onShowValuesChange', 'showValues', 'children'])
  const [internalShowValues, setInternalShowValues] = createSignal(local.defaultShowValues ?? false)
  const showValues = () => local.showValues ?? internalShowValues()

  const setShowValues = (show: boolean) => {
    setInternalShowValues(show)
    local.onShowValuesChange?.(show)
  }

  return (
    <EnvironmentVariablesContext.Provider
      value={{
        setShowValues,
        get showValues() {
          return showValues()
        },
      }}
    >
      <div data-scope={SCOPE} data-part="root" {...rest}>
        {local.children}
      </div>
    </EnvironmentVariablesContext.Provider>
  )
}

export type EnvironmentVariablesHeaderProps = JSX.HTMLAttributes<HTMLDivElement>

export function EnvironmentVariablesHeader(props: EnvironmentVariablesHeaderProps) {
  return <div data-scope={SCOPE} data-part="header" {...props} />
}

export type EnvironmentVariablesTitleProps = JSX.HTMLAttributes<HTMLHeadingElement>

export function EnvironmentVariablesTitle(props: EnvironmentVariablesTitleProps) {
  const [local, rest] = splitProps(props, ['children'])
  return (
    <h3 data-scope={SCOPE} data-part="title" {...rest}>
      {local.children ?? 'Environment Variables'}
    </h3>
  )
}

export type EnvironmentVariablesToggleProps = JSX.HTMLAttributes<HTMLDivElement> & {
  toggleIcon?: JSX.Element
}

export function EnvironmentVariablesToggle(props: EnvironmentVariablesToggleProps) {
  const [local, rest] = splitProps(props, ['toggleIcon'])
  const { setShowValues, showValues } = useEnvironmentVariables()

  return (
    <div data-scope={SCOPE} data-part="toggle" {...rest}>
      <span data-scope={SCOPE} data-part="toggle-icon">
        <Show when={showValues}>{local.toggleIcon}</Show>
      </span>
      <Switch.Root
        aria-label="Toggle value visibility"
        checked={showValues}
        onCheckedChange={(details) => setShowValues(details.checked)}
      />
    </div>
  )
}

export type EnvironmentVariablesContentProps = JSX.HTMLAttributes<HTMLDivElement>

export function EnvironmentVariablesContent(props: EnvironmentVariablesContentProps) {
  return <div data-scope={SCOPE} data-part="content" {...props} />
}

interface EnvironmentVariableContextValue {
  name: string
  value: string
}

const EnvironmentVariableContext = createContext<EnvironmentVariableContextValue>()

export function useEnvironmentVariable(): EnvironmentVariableContextValue {
  const context = useContext(EnvironmentVariableContext)
  if (!context) {
    throw new Error('EnvironmentVariable parts must be used within EnvironmentVariable')
  }
  return context
}

export type EnvironmentVariableGroupProps = JSX.HTMLAttributes<HTMLDivElement>

export function EnvironmentVariableGroup(props: EnvironmentVariableGroupProps) {
  return <div data-scope={SCOPE} data-part="group" {...props} />
}

export type EnvironmentVariableNameProps = JSX.HTMLAttributes<HTMLSpanElement>

export function EnvironmentVariableName(props: EnvironmentVariableNameProps) {
  const [local, rest] = splitProps(props, ['children'])
  const { name } = useEnvironmentVariable()
  return (
    <span data-scope={SCOPE} data-part="name" {...rest}>
      {local.children ?? name}
    </span>
  )
}

export type EnvironmentVariableValueProps = JSX.HTMLAttributes<HTMLSpanElement>

export function EnvironmentVariableValue(props: EnvironmentVariableValueProps) {
  const [local, rest] = splitProps(props, ['children'])
  const { value } = useEnvironmentVariable()
  const { showValues } = useEnvironmentVariables()
  const displayValue = () => (showValues ? value : '•'.repeat(Math.min(value.length, 20)))

  return (
    <span data-hidden={!showValues || undefined} data-scope={SCOPE} data-part="value" {...rest}>
      {local.children ?? displayValue()}
    </span>
  )
}

export type EnvironmentVariableProps = JSX.HTMLAttributes<HTMLDivElement> & {
  name: string
  value: string
}

export function EnvironmentVariable(props: EnvironmentVariableProps) {
  const [local, rest] = splitProps(props, ['name', 'value', 'children'])

  return (
    <EnvironmentVariableContext.Provider value={{ name: local.name, value: local.value }}>
      <div data-scope={SCOPE} data-part="variable" {...rest}>
        {local.children ?? (
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

export type EnvironmentVariableCopyButtonProps = JSX.HTMLAttributes<HTMLButtonElement> & {
  copyFormat?: 'export' | 'name' | 'value'
  timeout?: number
}

export function EnvironmentVariableCopyButton(props: EnvironmentVariableCopyButtonProps) {
  const [local, rest] = splitProps(props, ['copyFormat', 'timeout', 'children', 'onClick'])
  const { name, value } = useEnvironmentVariable()
  const [isCopied, setIsCopied] = createSignal(false)
  let timer: ReturnType<typeof setTimeout> | undefined

  const getTextToCopy = () => {
    if (local.copyFormat === 'export') return `export ${name}="${value}"`
    if (local.copyFormat === 'name') return name
    return value
  }

  return (
    <button
      aria-label="Copy"
      data-copied={isCopied() || undefined}
      data-scope={SCOPE}
      data-part="copy-button"
      onClick={(event) => {
        ;(local.onClick as ((event: MouseEvent) => void) | undefined)?.(event)
        navigator.clipboard
          .writeText(getTextToCopy())
          .then(() => {
            setIsCopied(true)
            if (timer) clearTimeout(timer)
            timer = setTimeout(() => setIsCopied(false), local.timeout ?? 2000)
          })
          .catch(() => {
            // clipboard unavailable
          })
      }}
      type="button"
      {...rest}
    >
      {local.children}
    </button>
  )
}

export type EnvironmentVariableRequiredProps = JSX.HTMLAttributes<HTMLSpanElement>

export function EnvironmentVariableRequired(props: EnvironmentVariableRequiredProps) {
  const [local, rest] = splitProps(props, ['children'])
  return (
    <span data-scope={SCOPE} data-part="required" {...rest}>
      {local.children ?? 'Required'}
    </span>
  )
}
