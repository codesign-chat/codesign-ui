import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useDrawerContext } from './use-drawer-context.ts'

export interface DrawerTitleBaseProps extends PolymorphicProps<'h2'> {}
export interface DrawerTitleProps extends HTMLProps<'h2'>, DrawerTitleBaseProps {}

export const DrawerTitle = (props: DrawerTitleProps) => {
  const drawer = useDrawerContext()
  const mergedProps = mergeProps(() => drawer().getTitleProps(), props)

  return <codesign.h2 {...mergedProps} />
}
