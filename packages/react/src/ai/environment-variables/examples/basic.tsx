import 'styles/ai.module.css'
import { useState } from 'react'
import {
  EnvironmentVariable,
  EnvironmentVariableCopyButton,
  EnvironmentVariables,
  EnvironmentVariablesContent,
  EnvironmentVariablesHeader,
  EnvironmentVariablesTitle,
  EnvironmentVariablesToggle,
} from '../environment-variables.tsx'

export function Basic() {
  const [showValues, setShowValues] = useState(false)

  return (
    <EnvironmentVariables onShowValuesChange={setShowValues} style={{ maxWidth: 520 }}>
      <EnvironmentVariablesHeader>
        <EnvironmentVariablesTitle />
        <EnvironmentVariablesToggle />
      </EnvironmentVariablesHeader>
      <EnvironmentVariablesContent>
        <EnvironmentVariable name="DATABASE_URL" value="postgres://localhost:5432/app">
          <EnvironmentVariableCopyButton />
          <EnvironmentVariableCopyButton copyFormat="export" />
        </EnvironmentVariable>
        <EnvironmentVariable name="AI_API_KEY" value="sk-0123456789abcdef">
          <EnvironmentVariableCopyButton />
        </EnvironmentVariable>
      </EnvironmentVariablesContent>
      <div style={{ padding: '0.75rem 1rem', fontSize: '0.75rem' }}>Values are {showValues ? 'visible' : 'hidden'}</div>
    </EnvironmentVariables>
  )
}
