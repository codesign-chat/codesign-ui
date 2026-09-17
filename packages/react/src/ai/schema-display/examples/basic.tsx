import 'styles/ai.module.css'
import {
  SchemaDisplay,
  SchemaDisplayContent,
  SchemaDisplayDescription,
  SchemaDisplayExample,
  SchemaDisplayHeader,
  SchemaDisplayMethod,
  SchemaDisplayParameter,
  SchemaDisplayPath,
  SchemaDisplayProperty,
  SchemaDisplaySection,
} from '../schema-display.tsx'

const PARAMETERS = [
  { location: 'path' as const, name: 'componentId', required: true, type: 'string' },
  { description: 'Filter by framework', location: 'query' as const, name: 'framework', type: 'string' },
]

const RESPONSE_PROPERTIES = [
  { name: 'id', required: true, type: 'string' },
  { name: 'name', required: true, type: 'string' },
  {
    description: 'Usage per framework',
    name: 'usage',
    properties: [
      { name: 'react', type: 'number' },
      { name: 'vue', type: 'number' },
    ],
    type: 'object',
  },
  { items: { name: 'item', type: 'string' }, name: 'tags', type: 'array' },
]

export function Basic() {
  return (
    <SchemaDisplay
      description="Returns usage metrics for a single component."
      method="GET"
      parameters={PARAMETERS}
      path="/api/components/{componentId}/usage"
      style={{ maxWidth: 560 }}
    >
      <SchemaDisplayHeader>
        <SchemaDisplayMethod />
        <SchemaDisplayPath />
      </SchemaDisplayHeader>
      <SchemaDisplayDescription />
      <SchemaDisplayContent>
        <SchemaDisplaySection count={PARAMETERS.length} defaultOpen label="Parameters">
          {PARAMETERS.map((parameter) => (
            <SchemaDisplayParameter key={parameter.name} parameter={parameter} />
          ))}
        </SchemaDisplaySection>
        <SchemaDisplaySection count={RESPONSE_PROPERTIES.length} label="Response">
          {RESPONSE_PROPERTIES.map((property) => (
            <SchemaDisplayProperty key={property.name} property={property} />
          ))}
        </SchemaDisplaySection>
        <SchemaDisplaySection label="Example">
          <SchemaDisplayExample>{`{ "id": "dialog", "usage": { "react": 1280 } }`}</SchemaDisplayExample>
        </SchemaDisplaySection>
      </SchemaDisplayContent>
    </SchemaDisplay>
  )
}
