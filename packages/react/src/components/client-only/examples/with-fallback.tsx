import { ClientOnly } from '@codesign-ui/react/client-only'

export const WithFallback = () => (
  <ClientOnly fallback={<div>Loading...</div>}>
    <div>This content is only rendered on the client side.</div>
  </ClientOnly>
)
