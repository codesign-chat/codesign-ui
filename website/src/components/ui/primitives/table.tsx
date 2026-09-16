'use client'
import type { Assign, PolymorphicProps } from '@codesign-ui/react'
import { codesign } from '@codesign-ui/react/factory'
import { type TableVariantProps, table } from 'styled-system/recipes'
import type { HTMLStyledProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(table)

export interface RootProps extends Assign<HTMLStyledProps<'table'>, PolymorphicProps>, TableVariantProps {}
export const Root = withProvider<HTMLTableElement, RootProps>(codesign.table, 'root')

export const Body = withContext<HTMLTableSectionElement, Assign<HTMLStyledProps<'tbody'>, PolymorphicProps>>(
  codesign.tbody,
  'body',
)

export const Caption = withContext<HTMLTableCaptionElement, Assign<HTMLStyledProps<'caption'>, PolymorphicProps>>(
  codesign.caption,
  'caption',
)

export const Cell = withContext<HTMLTableCellElement, Assign<HTMLStyledProps<'td'>, PolymorphicProps>>(
  codesign.td,
  'cell',
)

export const Foot = withContext<HTMLTableSectionElement, Assign<HTMLStyledProps<'tfoot'>, PolymorphicProps>>(
  codesign.tfoot,
  'footer',
)

export const Head = withContext<HTMLTableSectionElement, Assign<HTMLStyledProps<'head'>, PolymorphicProps>>(
  codesign.thead,
  'head',
)

export const Header = withContext<HTMLTableCellElement, Assign<HTMLStyledProps<'th'>, PolymorphicProps>>(
  codesign.th,
  'header',
)

export const Row = withContext<HTMLTableRowElement, Assign<HTMLStyledProps<'tr'>, PolymorphicProps>>(codesign.tr, 'row')
