import { getDocument, getWindow } from '@zag-js/dom-query'
import { type JSX, Show, createMemo, createSignal } from 'solid-js'
import { codesign } from '../../components/factory.tsx'
import { runIfFn } from '../../utils/run-if-fn.ts'
import { EnvironmentContextProvider, type RootNode } from './use-environment-context.ts'

export interface EnvironmentProviderProps {
  children?: JSX.Element
  value?: RootNode | (() => RootNode)
}

export const EnvironmentProvider = (props: EnvironmentProviderProps) => {
  const [spanRef, setSpanRef] = createSignal<HTMLSpanElement>()
  const getRootNode = () => runIfFn(props.value) ?? spanRef()?.getRootNode() ?? document

  const environment = createMemo(() => ({
    getRootNode,
    getDocument: () => getDocument(getRootNode()),
    getWindow: () => getWindow(getRootNode()),
  }))

  return (
    <EnvironmentContextProvider value={environment}>
      {props.children}
      <Show when={!props.value}>
        <codesign.span hidden ref={setSpanRef} />
      </Show>
    </EnvironmentContextProvider>
  )
}
