import type { ComponentProps, HTMLAttributes } from 'react'
import { createContext, useContext, useMemo } from 'react'
import { Collapsible } from '../../components/collapsible/index.ts'

type TestStatus = 'failed' | 'passed' | 'running' | 'skipped'

interface TestResultsSummary {
  failed: number
  passed: number
  skipped: number
  total: number
  duration?: number
}

interface TestResultsContextType {
  summary?: TestResultsSummary
}

const TestResultsContext = createContext<TestResultsContextType>({})

const formatDuration = (ms: number) => {
  if (ms < 1000) {
    return `${ms}ms`
  }
  return `${(ms / 1000).toFixed(2)}s`
}

export type TestResultsHeaderProps = HTMLAttributes<HTMLDivElement>

export function TestResultsHeader(props: TestResultsHeaderProps) {
  return <div data-scope="test-results" data-part="header" {...props} />
}

export type TestResultsDurationProps = HTMLAttributes<HTMLSpanElement>

export function TestResultsDuration({ children, ...props }: TestResultsDurationProps) {
  const { summary } = useContext(TestResultsContext)

  if (!summary?.duration) {
    return null
  }

  return (
    <span data-scope="test-results" data-part="duration" {...props}>
      {children ?? formatDuration(summary.duration)}
    </span>
  )
}

export type TestResultsSummaryProps = HTMLAttributes<HTMLDivElement>

export function TestResultsSummary({ children, ...props }: TestResultsSummaryProps) {
  const { summary } = useContext(TestResultsContext)

  if (!summary) {
    return null
  }

  return (
    <div data-scope="test-results" data-part="summary" {...props}>
      {children ?? (
        <>
          <span data-part="count" data-status="passed">
            {summary.passed} passed
          </span>
          {summary.failed > 0 && (
            <span data-part="count" data-status="failed">
              {summary.failed} failed
            </span>
          )}
          {summary.skipped > 0 && (
            <span data-part="count" data-status="skipped">
              {summary.skipped} skipped
            </span>
          )}
        </>
      )}
    </div>
  )
}

export type TestResultsProps = HTMLAttributes<HTMLDivElement> & {
  summary?: TestResultsSummary
}

export function TestResults({ summary, children, ...props }: TestResultsProps) {
  const contextValue = useMemo(() => ({ summary }), [summary])

  return (
    <TestResultsContext.Provider value={contextValue}>
      <div data-scope="test-results" data-part="root" {...props}>
        {children ??
          (summary && (
            <TestResultsHeader>
              <TestResultsSummary />
              <TestResultsDuration />
            </TestResultsHeader>
          ))}
      </div>
    </TestResultsContext.Provider>
  )
}

export type TestResultsProgressProps = HTMLAttributes<HTMLDivElement>

export function TestResultsProgress({ children, ...props }: TestResultsProgressProps) {
  const { summary } = useContext(TestResultsContext)

  if (!summary) {
    return null
  }

  const passedPercent = (summary.passed / summary.total) * 100
  const failedPercent = (summary.failed / summary.total) * 100

  return (
    <div data-scope="test-results" data-part="progress" {...props}>
      {children ?? (
        <>
          <div data-scope="test-results" data-part="progress-track">
            <div
              data-scope="test-results"
              data-part="progress-fill"
              data-status="passed"
              style={{ width: `${passedPercent}%` }}
            />
            <div
              data-scope="test-results"
              data-part="progress-fill"
              data-status="failed"
              style={{ width: `${failedPercent}%` }}
            />
          </div>
          <div data-scope="test-results" data-part="progress-meta">
            <span>
              {summary.passed}/{summary.total} tests passed
            </span>
            <span>{passedPercent.toFixed(0)}%</span>
          </div>
        </>
      )}
    </div>
  )
}

export type TestResultsContentProps = HTMLAttributes<HTMLDivElement>

export function TestResultsContent(props: TestResultsContentProps) {
  return <div data-scope="test-results" data-part="content" {...props} />
}

interface TestSuiteContextType {
  name: string
  status: TestStatus
}

const TestSuiteContext = createContext<TestSuiteContextType>({ name: '', status: 'passed' })

export type TestSuiteProps = ComponentProps<typeof Collapsible.Root> & {
  name: string
  status: TestStatus
}

export function TestSuite({ name, status, children, ...props }: TestSuiteProps) {
  const contextValue = useMemo(() => ({ name, status }), [name, status])

  return (
    <TestSuiteContext.Provider value={contextValue}>
      <Collapsible.Root data-scope="test-results" data-part="suite" data-status={status} {...props}>
        {children}
      </Collapsible.Root>
    </TestSuiteContext.Provider>
  )
}

export type TestSuiteNameProps = Omit<ComponentProps<typeof Collapsible.Trigger>, 'onOpenChange'>

export function TestSuiteName({ children, ...props }: TestSuiteNameProps) {
  const { name, status } = useContext(TestSuiteContext)

  return (
    <Collapsible.Trigger data-scope="test-results" data-part="suite-trigger" data-status={status} {...props}>
      {children ?? name}
    </Collapsible.Trigger>
  )
}

export type TestSuiteStatsProps = HTMLAttributes<HTMLDivElement> & {
  failed?: number
  passed?: number
  skipped?: number
}

export function TestSuiteStats({ failed = 0, passed = 0, skipped = 0, children, ...props }: TestSuiteStatsProps) {
  return (
    <div data-scope="test-results" data-part="suite-stats" {...props}>
      {children ?? (
        <>
          {passed > 0 && (
            <span data-part="stat" data-status="passed">
              {passed} passed
            </span>
          )}
          {failed > 0 && (
            <span data-part="stat" data-status="failed">
              {failed} failed
            </span>
          )}
          {skipped > 0 && (
            <span data-part="stat" data-status="skipped">
              {skipped} skipped
            </span>
          )}
        </>
      )}
    </div>
  )
}

export type TestSuiteContentProps = ComponentProps<typeof Collapsible.Content>

export function TestSuiteContent({ children, ...props }: TestSuiteContentProps) {
  return (
    <Collapsible.Content data-scope="test-results" data-part="suite-content" {...props}>
      <div data-part="suite-list">{children}</div>
    </Collapsible.Content>
  )
}

interface TestContextType {
  name: string
  status: TestStatus
  duration?: number
}

const TestContext = createContext<TestContextType>({ name: '', status: 'passed' })

export type TestNameProps = HTMLAttributes<HTMLSpanElement>

export function TestName({ children, ...props }: TestNameProps) {
  const { name } = useContext(TestContext)

  return (
    <span data-scope="test-results" data-part="name" {...props}>
      {children ?? name}
    </span>
  )
}

export type TestDurationProps = HTMLAttributes<HTMLSpanElement>

export function TestDuration({ children, ...props }: TestDurationProps) {
  const { duration } = useContext(TestContext)

  if (duration === undefined) {
    return null
  }

  return (
    <span data-scope="test-results" data-part="test-duration" {...props}>
      {children ?? `${duration}ms`}
    </span>
  )
}

export type TestStatusProps = HTMLAttributes<HTMLSpanElement>

export function TestStatus({ children, ...props }: TestStatusProps) {
  const { status } = useContext(TestContext)

  return (
    <span data-scope="test-results" data-part="test-status" data-status={status} {...props}>
      {children ?? status}
    </span>
  )
}

export type TestProps = HTMLAttributes<HTMLDivElement> & {
  name: string
  status: TestStatus
  duration?: number
}

export function Test({ name, status, duration, children, ...props }: TestProps) {
  const contextValue = useMemo(() => ({ duration, name, status }), [duration, name, status])

  return (
    <TestContext.Provider value={contextValue}>
      <div data-scope="test-results" data-part="test" {...props}>
        {children ?? (
          <>
            <TestStatus />
            <TestName />
            {duration !== undefined && <TestDuration />}
          </>
        )}
      </div>
    </TestContext.Provider>
  )
}

export type TestErrorProps = HTMLAttributes<HTMLDivElement>

export function TestError(props: TestErrorProps) {
  return <div data-scope="test-results" data-part="error" {...props} />
}

export type TestErrorMessageProps = HTMLAttributes<HTMLParagraphElement>

export function TestErrorMessage(props: TestErrorMessageProps) {
  return <p data-scope="test-results" data-part="error-message" {...props} />
}

export type TestErrorStackProps = HTMLAttributes<HTMLPreElement>

export function TestErrorStack(props: TestErrorStackProps) {
  return <pre data-scope="test-results" data-part="error-stack" {...props} />
}
