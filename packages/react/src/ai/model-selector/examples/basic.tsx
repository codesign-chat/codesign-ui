import 'styles/ai.module.css'
import { useState } from 'react'
import {
  ModelSelector,
  ModelSelectorContent,
  ModelSelectorEmpty,
  ModelSelectorGroup,
  ModelSelectorInput,
  ModelSelectorItem,
  ModelSelectorList,
  ModelSelectorLogo,
  ModelSelectorLogoGroup,
  ModelSelectorName,
  ModelSelectorSeparator,
  ModelSelectorShortcut,
  ModelSelectorTrigger,
} from '../model-selector.tsx'

const MODELS = [
  { provider: 'anthropic', value: 'claude-sonnet-4-5' },
  { provider: 'openai', value: 'gpt-5.1' },
  { provider: 'google', value: 'gemini-3-pro' },
]

export function Basic() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div style={{ maxWidth: 420 }}>
      <ModelSelector>
        <ModelSelectorTrigger>{selected ?? 'Choose a model…'}</ModelSelectorTrigger>
        <ModelSelectorContent>
          <ModelSelectorInput />
          <ModelSelectorList>
            <ModelSelectorGroup label="Frontier">
              {MODELS.map((model) => (
                <ModelSelectorItem key={model.value} onSelect={setSelected} value={model.value}>
                  <ModelSelectorLogo provider={model.provider} />
                  <ModelSelectorName>{model.value}</ModelSelectorName>
                  <ModelSelectorShortcut>Enter</ModelSelectorShortcut>
                </ModelSelectorItem>
              ))}
            </ModelSelectorGroup>
          </ModelSelectorList>
          <ModelSelectorEmpty>No models match your search</ModelSelectorEmpty>
        </ModelSelectorContent>
      </ModelSelector>
      {selected && <p>Selected: {selected}</p>}
    </div>
  )
}

export function WithLogoGroup() {
  return (
    <ModelSelector>
      <ModelSelectorTrigger>
        <ModelSelectorLogoGroup>
          <ModelSelectorLogo provider="anthropic" />
          <ModelSelectorLogo provider="openai" />
        </ModelSelectorLogoGroup>
        Multi-provider routing
      </ModelSelectorTrigger>
      <ModelSelectorContent>
        <ModelSelectorInput />
        <ModelSelectorList>
          <ModelSelectorGroup label="Anthropic">
            <ModelSelectorItem value="claude-opus-4-6">
              <ModelSelectorLogo provider="anthropic" />
              <ModelSelectorName>claude-opus-4-6</ModelSelectorName>
            </ModelSelectorItem>
            <ModelSelectorItem value="claude-sonnet-4-5">
              <ModelSelectorLogo provider="anthropic" />
              <ModelSelectorName>claude-sonnet-4-5</ModelSelectorName>
            </ModelSelectorItem>
          </ModelSelectorGroup>
          <ModelSelectorSeparator />
          <ModelSelectorGroup label="OpenAI">
            <ModelSelectorItem value="gpt-5.1">
              <ModelSelectorLogo provider="openai" />
              <ModelSelectorName>gpt-5.1</ModelSelectorName>
            </ModelSelectorItem>
          </ModelSelectorGroup>
        </ModelSelectorList>
        <ModelSelectorEmpty>Nothing here</ModelSelectorEmpty>
      </ModelSelectorContent>
    </ModelSelector>
  )
}
