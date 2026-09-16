import { EnvironmentProvider } from '@codesign-ui/solid/environment'
import { Usage } from './usage.tsx'

export const Basic = () => (
  <EnvironmentProvider>
    <Usage />
  </EnvironmentProvider>
)
