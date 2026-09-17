import 'styles/ai.module.css'
import { Agent, AgentContent, AgentHeader, AgentInstructions, AgentOutput, AgentTool, AgentTools } from '../agent.tsx'

const SEARCH_TOOL_SCHEMA = `{
  "type": "object",
  "properties": {
    "query": { "type": "string" },
    "limit": { "type": "number", "default": 10 }
  },
  "required": ["query"]
}`

export function Basic() {
  return (
    <Agent style={{ maxWidth: 520 }}>
      <AgentHeader model="claude-sonnet-4-5" name="docs-agent" />
      <AgentContent>
        <AgentInstructions>
          Answer questions about the component library. Always cite the docs page you used.
        </AgentInstructions>
        <AgentTools>
          <AgentTool
            description="Search the component index for relevant docs"
            schema={SEARCH_TOOL_SCHEMA}
            toolName="search_docs"
          />
          <AgentTool description="Fetch a page from codesign.chat" schema={SEARCH_TOOL_SCHEMA} toolName="fetch_page" />
        </AgentTools>
        <AgentOutput schema={`{ answer: string, sources: string[] }`} />
      </AgentContent>
    </Agent>
  )
}

export function Minimal() {
  return (
    <Agent style={{ maxWidth: 520 }}>
      <AgentHeader name="tool-runner" />
      <AgentContent>
        <AgentTools>
          <AgentTool description="Run a shell command" schema='{ "command": "string" }' toolName="bash" />
        </AgentTools>
      </AgentContent>
    </Agent>
  )
}
