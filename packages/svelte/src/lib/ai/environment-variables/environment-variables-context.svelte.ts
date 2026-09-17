import { getContext } from 'svelte'

export interface EnvironmentVariablesContextValue {
  setShowValues: (show: boolean) => void
  showValues: boolean
}

export interface EnvironmentVariableContextValue {
  name: string
  value: string
}

export const envVarsKey: symbol = Symbol('env-vars')
export const envVarKey: symbol = Symbol('env-var')

export function useEnvironmentVariables(): EnvironmentVariablesContextValue {
  const context = getContext<EnvironmentVariablesContextValue>(envVarsKey)
  if (!context) {
    throw new Error('EnvironmentVariables components must be used within EnvironmentVariables')
  }
  return context
}

export function useEnvironmentVariable(): EnvironmentVariableContextValue {
  const context = getContext<EnvironmentVariableContextValue>(envVarKey)
  if (!context) {
    throw new Error('EnvironmentVariable parts must be used within EnvironmentVariable')
  }
  return context
}
