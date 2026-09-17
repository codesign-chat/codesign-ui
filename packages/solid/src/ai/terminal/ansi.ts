export interface AnsiSegment {
  text: string
  color?: string
  bold?: boolean
  faint?: boolean
}

const FG: Record<number, string> = {
  30: '#666666',
  31: '#e06c75',
  32: '#98c379',
  33: '#e5c07b',
  34: '#61afef',
  35: '#c678dd',
  36: '#56b6c2',
  37: '#abb2bf',
  90: '#5c6370',
  91: '#e06c75',
  92: '#98c379',
  93: '#e5c07b',
  94: '#61afef',
  95: '#c678dd',
  96: '#56b6c2',
  97: '#ffffff',
}

// Minimal SGR parser: handles colors, bold and faint for terminal output previews
export function parseAnsi(output: string): AnsiSegment[] {
  const segments: AnsiSegment[] = []
  let color: string | undefined
  let bold = false
  let faint = false

  const push = (text: string) => {
    if (text.length > 0) {
      segments.push({ text, color, bold, faint })
    }
  }

  // biome-ignore lint/suspicious/noControlCharactersInRegex: ESC is the ANSI escape introducer
  const re = /\x1b\[([0-9;]*)m/g
  let last = 0
  let match: RegExpExecArray | null = re.exec(output)

  while (match !== null) {
    push(output.slice(last, match.index))
    last = match.index + match[0].length
    match = re.exec(output)

    const params = match[1].split(';').map((p) => (p === '' ? 0 : Number.parseInt(p, 10)))
    for (const code of params) {
      if (code === 0) {
        color = undefined
        bold = false
        faint = false
      } else if (code === 1) {
        bold = true
      } else if (code === 2) {
        faint = true
      } else if (code === 39) {
        color = undefined
      } else if (FG[code]) {
        color = FG[code]
      }
    }
  }

  push(output.slice(last))
  return segments
}
