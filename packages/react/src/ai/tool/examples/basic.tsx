import { Tool, ToolContent, ToolHeader, ToolInput, ToolOutput } from '../tool.tsx'

export function Completed() {
  return (
    <Tool>
      <ToolHeader state="output-available" type="tool-weather" />
      <ToolContent>
        <ToolInput input={{ city: 'Tokyo', unit: 'celsius' }} />
        <ToolOutput output={{ condition: 'Sunny', temperature: 22 }} />
      </ToolContent>
    </Tool>
  )
}

export function ErrorState() {
  return (
    <Tool>
      <ToolHeader state="output-error" type="tool-weather" />
      <ToolContent>
        <ToolInput input={{ city: 'Nowhere' }} />
        <ToolOutput errorText="City not found." />
      </ToolContent>
    </Tool>
  )
}

export function Running() {
  return (
    <Tool defaultOpen>
      <ToolHeader state="input-available" type="tool-weather" />
      <ToolContent>
        <ToolInput input={{ city: 'Tokyo' }} />
      </ToolContent>
    </Tool>
  )
}
