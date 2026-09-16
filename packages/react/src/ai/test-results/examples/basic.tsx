import 'styles/ai.module.css'
import {
  Test,
  TestError,
  TestErrorMessage,
  TestErrorStack,
  TestResults,
  TestResultsContent,
  TestResultsDuration,
  TestResultsHeader,
  TestResultsProgress,
  TestResultsSummary,
  TestSuite,
  TestSuiteContent,
  TestSuiteName,
  TestSuiteStats,
} from '../test-results.tsx'

export function Basic() {
  return (
    <TestResults summary={{ duration: 8_230, failed: 1, passed: 5, skipped: 1, total: 7 }} style={{ maxWidth: 520 }}>
      <TestResultsHeader>
        <TestResultsSummary />
        <TestResultsDuration />
      </TestResultsHeader>
      <TestResultsProgress />
      <TestResultsContent>
        <TestSuite defaultOpen name="ai / conversation" status="failed">
          <TestSuiteName />
          <TestSuiteStats failed={1} passed={2} />
          <TestSuiteContent>
            <Test duration={120} name="streams an assistant reply" status="passed" />
            <Test name="keeps scroll position" status="passed" />
            <Test duration={310} name="auto-closes after streaming" status="failed">
              <TestError>
                <TestErrorMessage>Expected auto-close after 1000ms</TestErrorMessage>
                <TestErrorStack>{`  at autoClose (reasoning.tsx:118)\n  at effect (use-effect.ts:41)`}</TestErrorStack>
              </TestError>
            </Test>
          </TestSuiteContent>
        </TestSuite>
        <TestSuite name="ai / attachments" status="passed">
          <TestSuiteName />
          <TestSuiteStats passed={4} skipped={1} />
          <TestSuiteContent>
            <Test duration={2} name="categorizes media types" status="passed" />
            <Test name="skips empty labels" status="skipped" />
          </TestSuiteContent>
        </TestSuite>
      </TestResultsContent>
    </TestResults>
  )
}
