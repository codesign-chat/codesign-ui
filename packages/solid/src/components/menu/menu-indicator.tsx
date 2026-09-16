import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useMenuContext } from './use-menu-context.ts'

export interface MenuIndicatorBaseProps extends PolymorphicProps<'div'> {}
export interface MenuIndicatorProps extends HTMLProps<'div'>, MenuIndicatorBaseProps {}

export const MenuIndicator = (props: MenuIndicatorProps) => {
  const context = useMenuContext()
  const mergedProps = mergeProps(() => context().getIndicatorProps(), props)

  return <codesign.div {...mergedProps} />
}
