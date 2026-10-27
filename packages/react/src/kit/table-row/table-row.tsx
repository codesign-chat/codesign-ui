'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../../components/factory.ts'

export interface TableRowBaseProps extends PolymorphicProps {}
export interface TableRowProps extends HTMLProps<'tr'>, TableRowBaseProps {}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>((props, ref) => (
  <codesign.tr {...props} ref={ref} data-scope="table-row" data-part="root" />
))

TableRow.displayName = 'TableRow'

export interface TableRowCellBaseProps extends PolymorphicProps {}
export interface TableRowCellProps extends HTMLProps<'td'>, TableRowCellBaseProps {}

export const TableRowCell = forwardRef<HTMLTableCellElement, TableRowCellProps>((props, ref) => (
  <codesign.td {...props} ref={ref} data-scope="table-row" data-part="cell" />
))

TableRowCell.displayName = 'TableRowCell'
