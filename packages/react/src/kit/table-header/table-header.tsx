'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../../components/factory.ts'

export interface TableHeaderBaseProps extends PolymorphicProps {}
export interface TableHeaderProps extends HTMLProps<'thead'>, TableHeaderBaseProps {}

export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>((props, ref) => (
  <codesign.thead {...props} ref={ref} data-scope="table-header" data-part="root" />
))

TableHeader.displayName = 'TableHeader'

export interface TableHeaderCellBaseProps extends PolymorphicProps {}
export interface TableHeaderCellProps extends HTMLProps<'th'>, TableHeaderCellBaseProps {}

export const TableHeaderCell = forwardRef<HTMLTableCellElement, TableHeaderCellProps>((props, ref) => (
  <codesign.th {...props} ref={ref} data-scope="table-header" data-part="cell" />
))

TableHeaderCell.displayName = 'TableHeaderCell'

export interface TableHeaderSortTriggerBaseProps extends PolymorphicProps {}
export interface TableHeaderSortTriggerProps extends HTMLProps<'button'>, TableHeaderSortTriggerBaseProps {}

export const TableHeaderSortTrigger = forwardRef<HTMLButtonElement, TableHeaderSortTriggerProps>((props, ref) => (
  <codesign.button {...props} ref={ref} data-scope="table-header" data-part="sort" />
))

TableHeaderSortTrigger.displayName = 'TableHeaderSortTrigger'
