import { defineComponent, h, inject, provide, type InjectionKey, type PropType } from 'vue'
import { CollapsibleRoot, CollapsibleTrigger, CollapsibleContent } from '../../components/collapsible/index.ts'

const SCOPE = 'test-results'

export type TestStatus = 'failed' | 'passed' | 'running' | 'skipped'

export interface TestResultsSummary {
  duration?: number
  failed: number
  passed: number
  skipped: number
  total: number
}

const formatDuration = (ms: number) => (ms < 1000 ? ms + 'ms' : (ms / 1000).toFixed(2) + 's')

interface TestResultsContextValue {
  summary?: TestResultsSummary
}

interface TestSuiteContextValue {
  name: string
  status: TestStatus
}

interface TestContextValue {
  duration?: number
  name: string
  status: TestStatus
}

const testResultsKey: InjectionKey<TestResultsContextValue> = Symbol('test-results')
const testSuiteKey: InjectionKey<TestSuiteContextValue> = Symbol('test-suite')
const testKey: InjectionKey<TestContextValue> = Symbol('test')

export function useTestResults(): TestResultsContextValue {
  return inject(testResultsKey, {})
}

export function useTestSuite(): TestSuiteContextValue {
  const context = inject(testSuiteKey)
  if (!context) {
    throw new Error('TestSuite parts must be used within TestSuite')
  }
  return context
}

export function useTest(): TestContextValue {
  const context = inject(testKey)
  if (!context) {
    throw new Error('Test parts must be used within Test')
  }
  return context
}

export const TestResults = defineComponent({
  name: 'TestResults',
  props: { summary: { type: Object as PropType<TestResultsSummary>, default: undefined } },
  setup(props, { attrs, slots }) {
    provide(testResultsKey, { summary: props.summary })
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'root' }, slots.default?.())
  },
})

export const TestResultsHeader = defineComponent({
  name: 'TestResultsHeader',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'header' }, slots.default?.())
  },
})

export const TestResultsSummary = defineComponent({
  name: 'TestResultsSummary',
  setup(_, { attrs, slots }) {
    const { summary } = useTestResults()
    return () => {
      if (!summary) return null
      return h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'summary' }, [
        slots.default?.() ?? [
          h('span', { 'data-status': 'passed', 'data-scope': SCOPE, 'data-part': 'count' }, summary.passed + ' passed'),
          summary.failed > 0
            ? h(
                'span',
                { 'data-status': 'failed', 'data-scope': SCOPE, 'data-part': 'count' },
                summary.failed + ' failed',
              )
            : null,
          summary.skipped > 0
            ? h(
                'span',
                { 'data-status': 'skipped', 'data-scope': SCOPE, 'data-part': 'count' },
                summary.skipped + ' skipped',
              )
            : null,
        ],
      ])
    }
  },
})

export const TestResultsDuration = defineComponent({
  name: 'TestResultsDuration',
  setup(_, { attrs, slots }) {
    const { summary } = useTestResults()
    return () =>
      summary?.duration
        ? h(
            'span',
            { ...attrs, 'data-scope': SCOPE, 'data-part': 'duration' },
            slots.default?.() ?? formatDuration(summary.duration),
          )
        : null
  },
})

export const TestResultsProgress = defineComponent({
  name: 'TestResultsProgress',
  setup(_, { attrs, slots }) {
    const { summary } = useTestResults()
    return () => {
      if (!summary) return null
      const passedPercent = (summary.passed / summary.total) * 100
      const failedPercent = (summary.failed / summary.total) * 100
      return h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'progress' }, [
        slots.default?.() ?? [
          h('div', { 'data-scope': SCOPE, 'data-part': 'progress-track' }, [
            h('div', {
              'data-scope': SCOPE,
              'data-part': 'progress-fill',
              'data-status': 'passed',
              style: { width: passedPercent + '%' },
            }),
            h('div', {
              'data-scope': SCOPE,
              'data-part': 'progress-fill',
              'data-status': 'failed',
              style: { width: failedPercent + '%' },
            }),
          ]),
          h('div', { 'data-scope': SCOPE, 'data-part': 'progress-meta' }, [
            h('span', summary.passed + '/' + summary.total + ' tests passed'),
            h('span', passedPercent.toFixed(0) + '%'),
          ]),
        ],
      ])
    }
  },
})

export const TestResultsContent = defineComponent({
  name: 'TestResultsContent',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'content' }, slots.default?.())
  },
})

export const TestSuite = defineComponent({
  name: 'TestSuite',
  props: {
    name: { type: String, required: true },
    status: { type: String as PropType<TestStatus>, required: true },
  },
  setup(props, { attrs, slots }) {
    provide(testSuiteKey, { name: props.name, status: props.status })
    return () =>
      h(
        CollapsibleRoot,
        { ...attrs, 'data-scope': SCOPE, 'data-part': 'suite', 'data-status': props.status },
        slots.default,
      )
  },
})

export const TestSuiteName = defineComponent({
  name: 'TestSuiteName',
  setup(_, { attrs, slots }) {
    const { name, status } = useTestSuite()
    return () =>
      h(
        CollapsibleTrigger,
        { ...attrs, 'data-scope': SCOPE, 'data-part': 'suite-trigger', 'data-status': status },
        () => slots.default?.() ?? name,
      )
  },
})

export const TestSuiteStats = defineComponent({
  name: 'TestSuiteStats',
  props: {
    failed: { type: Number, default: 0 },
    passed: { type: Number, default: 0 },
    skipped: { type: Number, default: 0 },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'suite-stats' }, [
        slots.default?.() ?? [
          props.passed > 0
            ? h('span', { 'data-status': 'passed', 'data-scope': SCOPE, 'data-part': 'stat' }, props.passed + ' passed')
            : null,
          props.failed > 0
            ? h('span', { 'data-status': 'failed', 'data-scope': SCOPE, 'data-part': 'stat' }, props.failed + ' failed')
            : null,
          props.skipped > 0
            ? h(
                'span',
                { 'data-status': 'skipped', 'data-scope': SCOPE, 'data-part': 'stat' },
                props.skipped + ' skipped',
              )
            : null,
        ],
      ])
  },
})

export const TestSuiteContent = defineComponent({
  name: 'TestSuiteContent',
  setup(_, { attrs, slots }) {
    return () =>
      h(CollapsibleContent, { ...attrs, 'data-scope': SCOPE, 'data-part': 'suite-content' }, () =>
        h('div', { 'data-scope': SCOPE, 'data-part': 'suite-list' }, slots.default?.()),
      )
  },
})

export const Test = defineComponent({
  name: 'Test',
  props: {
    duration: { type: Number, default: undefined },
    name: { type: String, required: true },
    status: { type: String as PropType<TestStatus>, required: true },
  },
  setup(props, { attrs, slots }) {
    provide(testKey, { duration: props.duration, name: props.name, status: props.status })
    return () =>
      h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'test' }, [
        slots.default?.() ?? [
          h('span', { 'data-scope': SCOPE, 'data-part': 'test-status', 'data-status': props.status }, props.status),
          h('span', { 'data-scope': SCOPE, 'data-part': 'name' }, props.name),
          props.duration !== undefined
            ? h('span', { 'data-scope': SCOPE, 'data-part': 'test-duration' }, props.duration + 'ms')
            : null,
        ],
      ])
  },
})

export const TestName = defineComponent({
  name: 'TestName',
  setup(_, { attrs, slots }) {
    const { name } = useTest()
    return () => h('span', { ...attrs, 'data-scope': SCOPE, 'data-part': 'name' }, slots.default?.() ?? name)
  },
})

export const TestDuration = defineComponent({
  name: 'TestDuration',
  setup(_, { attrs, slots }) {
    const { duration } = useTest()
    return () =>
      duration !== undefined
        ? h(
            'span',
            { ...attrs, 'data-scope': SCOPE, 'data-part': 'test-duration' },
            slots.default?.() ?? duration + 'ms',
          )
        : null
  },
})

export const TestStatus = defineComponent({
  name: 'TestStatus',
  setup(_, { attrs, slots }) {
    const { status } = useTest()
    return () =>
      h(
        'span',
        { ...attrs, 'data-scope': SCOPE, 'data-part': 'test-status', 'data-status': status },
        slots.default?.() ?? status,
      )
  },
})

export const TestError = defineComponent({
  name: 'TestError',
  setup(_, { attrs, slots }) {
    return () => h('div', { ...attrs, 'data-scope': SCOPE, 'data-part': 'error' }, slots.default?.())
  },
})

export const TestErrorMessage = defineComponent({
  name: 'TestErrorMessage',
  setup(_, { attrs, slots }) {
    return () => h('p', { ...attrs, 'data-scope': SCOPE, 'data-part': 'error-message' }, slots.default?.())
  },
})

export const TestErrorStack = defineComponent({
  name: 'TestErrorStack',
  setup(_, { attrs, slots }) {
    return () => h('pre', { ...attrs, 'data-scope': SCOPE, 'data-part': 'error-stack' }, slots.default?.())
  },
})
