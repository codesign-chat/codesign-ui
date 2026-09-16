import type { Optional } from '@codesign-ui/react'
import { Splitter } from '@codesign-ui/react/splitter'

export const ComponentUnderTest = (props: Optional<Splitter.RootProps, 'panels'>) => (
  <Splitter.Root defaultSize={[50, 50]} panels={[{ id: 'a' }, { id: 'b' }]} {...props}>
    <Splitter.Panel id="a">A</Splitter.Panel>
    <Splitter.ResizeTrigger id="a:b" aria-label="Reisze" />
    <Splitter.Panel id="b">B</Splitter.Panel>
  </Splitter.Root>
)
