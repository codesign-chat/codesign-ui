import { codesign } from '@codesign-ui/solid/factory'

export const Factory = () => (
  <codesign.span
    asChild={(props) => (
      <a href="#" {...props()}>
        Codesign UI
      </a>
    )}
  />
)
