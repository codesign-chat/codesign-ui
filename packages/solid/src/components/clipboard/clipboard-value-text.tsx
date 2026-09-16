import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { useClipboardContext } from './use-clipboard-context.ts'

export interface ClipboardValueTextBaseProps extends PolymorphicProps<'span'> {}
export interface ClipboardValueTextProps extends HTMLProps<'span'>, ClipboardValueTextBaseProps {}

export const ClipboardValueText = (props: ClipboardValueTextProps) => {
  const api = useClipboardContext()
  const mergedProps = mergeProps(props)

  return <codesign.span {...mergedProps}>{props.children || api().value}</codesign.span>
}
