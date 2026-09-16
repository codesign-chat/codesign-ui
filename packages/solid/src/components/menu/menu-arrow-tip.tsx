import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useMenuContext } from './use-menu-context.ts'

export interface MenuArrowTipBaseProps extends PolymorphicProps<'div'> {}
export interface MenuArrowTipProps extends HTMLProps<'div'>, MenuArrowTipBaseProps {}

export const MenuArrowTip = (props: MenuArrowTipProps) => {
  const context = useMenuContext()
  const mergedProps = mergeProps(() => context().getArrowTipProps(), props)

  return <codesign.div {...mergedProps} />
}
