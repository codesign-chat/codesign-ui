import { EnvironmentProvider } from '@codesign-ui/react/environment'
import { Field } from '@codesign-ui/react/field'
import root from 'react-shadow'

// biome-ignore lint/complexity/useLiteralKeys: intentional
const Host = root['div']

export const ShadowDom = () => (
  <Host>
    <EnvironmentProvider>
      <Field.Root invalid>
        <Field.Label>Email</Field.Label>
        <Field.Input placeholder="me@example.com" />
        <Field.ErrorText>This is an error text</Field.ErrorText>
      </Field.Root>
    </EnvironmentProvider>
  </Host>
)
