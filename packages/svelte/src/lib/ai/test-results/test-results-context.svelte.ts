import { getContext } from 'svelte'

export type TestStatus = 'failed' | 'passed' | 'running' | 'skipped'

export interface TestResultsSummary {
  duration?: number
  failed: number
  passed: number
  skipped: number
  total: number
}

export interface TestResultsContextValue {
  summary?: TestResultsSummary
}

export interface TestSuiteContextValue {
  name: string
  status: TestStatus
}

export interface TestContextValue {
  duration?: number
  name: string
  status: TestStatus
}

export const testResultsKey: symbol = Symbol('test-results')
export const testSuiteKey: symbol = Symbol('test-suite')
export const testKey: symbol = Symbol('test')

export function useTestResults(): TestResultsContextValue {
  return getContext<TestResultsContextValue>(testResultsKey) ?? {}
}

export function useTestSuite(): TestSuiteContextValue {
  const context = getContext<TestSuiteContextValue>(testSuiteKey)
  if (!context) {
    throw new Error('TestSuite parts must be used within TestSuite')
  }
  return context
}

export function useTest(): TestContextValue {
  const context = getContext<TestContextValue>(testKey)
  if (!context) {
    throw new Error('Test parts must be used within Test')
  }
  return context
}

export function formatDuration(ms: number): string {
  return ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(2)}s`
}
