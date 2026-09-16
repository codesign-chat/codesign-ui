import { mergeProps } from '@zag-js/solid'
import { type JSX, For, splitProps } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useMarqueeContext } from './use-marquee-context.ts'

export interface MarqueeContentBaseProps extends PolymorphicProps<'div'> {
  children?: JSX.Element
}
export interface MarqueeContentProps extends HTMLProps<'div'>, MarqueeContentBaseProps {}

export const MarqueeContent = (props: MarqueeContentProps) => {
  const [localProps, restProps] = splitProps(props, ['children'])
  const context = useMarqueeContext()

  return (
    <For each={Array.from({ length: context().contentCount })}>
      {(_, index) => {
        const mergedProps = mergeProps(() => context().getContentProps({ index: index() }), restProps)
        return <codesign.div {...mergedProps}>{localProps.children}</codesign.div>
      }}
    </For>
  )
}
