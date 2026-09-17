import { Show, createContext, splitProps, useContext } from 'solid-js'
import type { JSX } from 'solid-js'
import { Collapsible } from '../../components/collapsible/index.ts'

const SCOPE = 'test-results'

export type TestStatus = 'failed' | 'passed' | 'running' | 'skipped'

export interface TestResultsSummary {
  duration?: number
  failed: number
  passed: number
  skipped: number
  total: number
}

const formatDuration = (ms: number) => (ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(2)}s`)

interface TestResultsContextValue {
  summary?: TestResultsSummary
}

const TestResultsContext = createContext<TestResultsContextValue>()

export function useTestResults(): TestResultsContextValue {
  return useContext(TestResultsContext) ?? {}
}

export type TestResultsProps = JSX.HTMLAttributes<HTMLDivElement> & {
  summary?: TestResultsSummary
}

export function TestResults(props: TestResultsProps) {
  const [local, rest] = splitProps(props, ['summary', 'children'])

  return (
    <TestResultsContext.Provider value={{ summary: local.summary }}>
      <div data-scope={SCOPE} data-part="root" {...rest}>
        {local.children}
      </div>
    </TestResultsContext.Provider>
  )
}

export type TestResultsHeaderProps = JSX.HTMLAttributes<HTMLDivElement>

export function TestResultsHeader(props: TestResultsHeaderProps) {
  return <div data-scope={SCOPE} data-part="header" {...props} />
}

export type TestResultsSummaryProps = JSX.HTMLAttributes<HTMLDivElement>

export function TestResultsSummary(props: TestResultsSummaryProps) {
  const [local, rest] = splitProps(props, ['children'])
  const { summary } = useTestResults()

  return (
    <Show when={summary}>
      {(s) => (
        <div data-scope={SCOPE} data-part="summary" {...rest}>
          {local.children ?? (
            <>
              <span data-status="passed" data-scope={SCOPE} data-part="count">
                {s().passed} passed
              </span>
              <Show when={s().failed > 0}>
                <span data-status="failed" data-scope={SCOPE} data-part="count">
                  {s().failed} failed
                </span>
              </Show>
              <Show when={s().skipped > 0}>
                <span data-status="skipped" data-scope={SCOPE} data-part="count">
                  {s().skipped} skipped
                </span>
              </Show>
            </>
          )}
        </div>
      )}
    </Show>
  )
}

export type TestResultsDurationProps = JSX.HTMLAttributes<HTMLSpanElement>

export function TestResultsDuration(props: TestResultsDurationProps) {
  const [local, rest] = splitProps(props, ['children'])
  const { summary } = useTestResults()

  return (
    <Show when={summary?.duration}>
      {(duration) => (
        <span data-scope={SCOPE} data-part="duration" {...rest}>
          {local.children ?? formatDuration(duration())}
        </span>
      )}
    </Show>
  )
}

export type TestResultsProgressProps = JSX.HTMLAttributes<HTMLDivElement>

export function TestResultsProgress(props: TestResultsProgressProps) {
  const [local, rest] = splitProps(props, ['children'])
  const { summary } = useTestResults()

  return (
    <Show when={summary}>
      {(s) => {
        const passedPercent = (s().passed / s().total) * 100
        const failedPercent = (s().failed / s().total) * 100
        return (
          <div data-scope={SCOPE} data-part="progress" {...rest}>
            {local.children ?? (
              <>
                <div data-scope={SCOPE} data-part="progress-track">
                  <div
                    data-scope={SCOPE}
                    data-part="progress-fill"
                    data-status="passed"
                    style={{ width: `${passedPercent}%` }}
                  />
                  <div
                    data-scope={SCOPE}
                    data-part="progress-fill"
                    data-status="failed"
                    style={{ width: `${failedPercent}%` }}
                  />
                </div>
                <div data-scope={SCOPE} data-part="progress-meta">
                  <span>
                    {s().passed}/{s().total} tests passed
                  </span>
                  <span>{passedPercent.toFixed(0)}%</span>
                </div>
              </>
            )}
          </div>
        )
      }}
    </Show>
  )
}

export type TestResultsContentProps = JSX.HTMLAttributes<HTMLDivElement>

export function TestResultsContent(props: TestResultsContentProps) {
  return <div data-scope={SCOPE} data-part="content" {...props} />
}

interface TestSuiteContextValue {
  name: string
  status: TestStatus
}

const TestSuiteContext = createContext<TestSuiteContextValue>()

export function useTestSuite(): TestSuiteContextValue {
  const context = useContext(TestSuiteContext)
  if (!context) {
    throw new Error('TestSuite parts must be used within TestSuite')
  }
  return context
}

export type TestSuiteProps = JSX.HTMLAttributes<HTMLDivElement> & {
  name: string
  status: TestStatus
}

export function TestSuite(props: TestSuiteProps) {
  const [local, rest] = splitProps(props, ['name', 'status', 'children'])

  return (
    <TestSuiteContext.Provider value={{ name: local.name, status: local.status }}>
      <Collapsible.Root data-scope={SCOPE} data-part="suite" data-status={local.status} {...rest}>
        {local.children}
      </Collapsible.Root>
    </TestSuiteContext.Provider>
  )
}

export type TestSuiteNameProps = JSX.HTMLAttributes<HTMLButtonElement>

export function TestSuiteName(props: TestSuiteNameProps) {
  const [local, rest] = splitProps(props, ['children'])
  const { name, status } = useTestSuite()

  return (
    <Collapsible.Trigger data-scope={SCOPE} data-part="suite-trigger" data-status={status} {...rest}>
      {local.children ?? name}
    </Collapsible.Trigger>
  )
}

export type TestSuiteStatsProps = JSX.HTMLAttributes<HTMLDivElement> & {
  failed?: number
  passed?: number
  skipped?: number
}

export function TestSuiteStats(props: TestSuiteStatsProps) {
  const [local, rest] = splitProps(props, ['failed', 'passed', 'skipped', 'children'])
  const failed = () => local.failed ?? 0
  const passed = () => local.passed ?? 0
  const skipped = () => local.skipped ?? 0

  return (
    <div data-scope={SCOPE} data-part="suite-stats" {...rest}>
      {local.children ?? (
        <>
          <Show when={passed() > 0}>
            <span data-status="passed" data-scope={SCOPE} data-part="stat">
              {passed()} passed
            </span>
          </Show>
          <Show when={failed() > 0}>
            <span data-status="failed" data-scope={SCOPE} data-part="stat">
              {failed()} failed
            </span>
          </Show>
          <Show when={skipped() > 0}>
            <span data-status="skipped" data-scope={SCOPE} data-part="stat">
              {skipped()} skipped
            </span>
          </Show>
        </>
      )}
    </div>
  )
}

export type TestSuiteContentProps = JSX.HTMLAttributes<HTMLDivElement>

export function TestSuiteContent(props: TestSuiteContentProps) {
  return (
    <Collapsible.Content data-scope={SCOPE} data-part="suite-content" {...props}>
      <div data-scope={SCOPE} data-part="suite-list">
        {props.children}
      </div>
    </Collapsible.Content>
  )
}

interface TestContextValue {
  duration?: number
  name: string
  status: TestStatus
}

const TestContext = createContext<TestContextValue>()

export function useTest(): TestContextValue {
  const context = useContext(TestContext)
  if (!context) {
    throw new Error('Test parts must be used within Test')
  }
  return context
}

export type TestProps = JSX.HTMLAttributes<HTMLDivElement> & {
  duration?: number
  name: string
  status: TestStatus
}

export function Test(props: TestProps) {
  const [local, rest] = splitProps(props, ['duration', 'name', 'status', 'children'])

  return (
    <TestContext.Provider value={{ duration: local.duration, name: local.name, status: local.status }}>
      <div data-scope={SCOPE} data-part="test" {...rest}>
        {local.children ?? (
          <>
            <span data-scope={SCOPE} data-part="test-status" data-status={local.status}>
              {local.status}
            </span>
            <span data-scope={SCOPE} data-part="name">
              {local.name}
            </span>
            <Show when={local.duration !== undefined}>
              <span data-scope={SCOPE} data-part="test-duration">
                {local.duration}ms
              </span>
            </Show>
          </>
        )}
      </div>
    </TestContext.Provider>
  )
}

export type TestNameProps = JSX.HTMLAttributes<HTMLSpanElement>

export function TestName(props: TestNameProps) {
  const [local, rest] = splitProps(props, ['children'])
  const { name } = useTest()
  return (
    <span data-scope={SCOPE} data-part="name" {...rest}>
      {local.children ?? name}
    </span>
  )
}

export type TestDurationProps = JSX.HTMLAttributes<HTMLSpanElement>

export function TestDuration(props: TestDurationProps) {
  const [local, rest] = splitProps(props, ['children'])
  const { duration } = useTest()
  return (
    <Show when={duration !== undefined}>
      <span data-scope={SCOPE} data-part="test-duration" {...rest}>
        {local.children ?? `${duration}ms`}
      </span>
    </Show>
  )
}

export type TestStatusProps = JSX.HTMLAttributes<HTMLSpanElement>

export function TestStatus(props: TestStatusProps) {
  const [local, rest] = splitProps(props, ['children'])
  const { status } = useTest()
  return (
    <span data-scope={SCOPE} data-part="test-status" data-status={status} {...rest}>
      {local.children ?? status}
    </span>
  )
}

export type TestErrorProps = JSX.HTMLAttributes<HTMLDivElement>

export function TestError(props: TestErrorProps) {
  return <div data-scope={SCOPE} data-part="error" {...props} />
}

export type TestErrorMessageProps = JSX.HTMLAttributes<HTMLParagraphElement>

export function TestErrorMessage(props: TestErrorMessageProps) {
  return <p data-scope={SCOPE} data-part="error-message" {...props} />
}

export type TestErrorStackProps = JSX.HTMLAttributes<HTMLPreElement>

export function TestErrorStack(props: TestErrorStackProps) {
  return <pre data-scope={SCOPE} data-part="error-stack" {...props} />
}
