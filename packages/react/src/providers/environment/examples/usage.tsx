import { useEnvironmentContext } from '@codesign-ui/react/environment'

export const Usage = () => {
  const { getRootNode } = useEnvironmentContext()

  return <pre>{JSON.stringify(getRootNode(), null, 2)}</pre>
}
