import { getContext } from 'svelte'

const STACK_FRAME_WITH_PARENS_REGEX = /^at\s+(.+?)\s+\((.+):(\d+):(\d+)\)$/
const STACK_FRAME_WITHOUT_FN_REGEX = /^at\s+(.+):(\d+):(\d+)$/
const ERROR_TYPE_REGEX = /^(\w+Error|Error):\s*(.*)$/

export interface StackFrame {
  columnNumber: number | null
  filePath: string | null
  functionName: string | null
  isInternal: boolean
  lineNumber: number | null
  raw: string
}

export interface ParsedStackTrace {
  errorMessage: string
  errorType: string | null
  frames: StackFrame[]
}

export interface StackTraceContextValue {
  isOpen: boolean
  onFilePathClick?: (filePath: string, line?: number, column?: number) => void
  raw: string
  setIsOpen: (open: boolean) => void
  trace: ParsedStackTrace
}

export const stackTraceKey: symbol = Symbol('stack-trace')

export function useStackTrace(): StackTraceContextValue {
  const context = getContext<StackTraceContextValue>(stackTraceKey)
  if (!context) {
    throw new Error('StackTrace components must be used within StackTrace')
  }
  return context
}

export function parseStackFrame(line: string): StackFrame {
  const trimmed = line.trim()
  const withParensMatch = trimmed.match(STACK_FRAME_WITH_PARENS_REGEX)
  if (withParensMatch) {
    const [, functionName, filePath, lineNum, colNum] = withParensMatch
    return {
      columnNumber: colNum ? Number.parseInt(colNum, 10) : null,
      filePath: filePath ?? null,
      functionName: functionName ?? null,
      isInternal: filePath.includes('node_modules') || filePath.startsWith('node:') || filePath.includes('internal/'),
      lineNumber: lineNum ? Number.parseInt(lineNum, 10) : null,
      raw: trimmed,
    }
  }
  const withoutFnMatch = trimmed.match(STACK_FRAME_WITHOUT_FN_REGEX)
  if (withoutFnMatch) {
    const [, filePath, lineNum, colNum] = withoutFnMatch
    return {
      columnNumber: colNum ? Number.parseInt(colNum, 10) : null,
      filePath: filePath ?? null,
      functionName: null,
      isInternal: filePath.includes('node_modules') || filePath.startsWith('node:') || filePath.includes('internal/'),
      lineNumber: lineNum ? Number.parseInt(lineNum, 10) : null,
      raw: trimmed,
    }
  }
  return {
    columnNumber: null,
    filePath: null,
    functionName: null,
    isInternal: trimmed.includes('node_modules') || trimmed.includes('node:'),
    lineNumber: null,
    raw: trimmed,
  }
}

export function parseStackTrace(trace: string): ParsedStackTrace {
  const lines = trace.split('\n').filter((line) => line.trim())
  if (lines.length === 0) {
    return { errorMessage: trace, errorType: null, frames: [] }
  }
  const firstLine = lines[0].trim()
  let errorType: string | null = null
  let errorMessage = firstLine
  const errorMatch = firstLine.match(ERROR_TYPE_REGEX)
  if (errorMatch) {
    errorType = errorMatch[1]
    errorMessage = errorMatch[2] || ''
  }
  const frames = lines
    .slice(1)
    .filter((line) => line.trim().startsWith('at '))
    .map(parseStackFrame)
  return { errorMessage, errorType, frames }
}
