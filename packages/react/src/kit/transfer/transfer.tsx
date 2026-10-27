'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../../components/factory.ts'

export interface TransferBaseProps extends PolymorphicProps {}
export interface TransferProps extends HTMLProps<'div'>, TransferBaseProps {}

export const Transfer = forwardRef<HTMLDivElement, TransferProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="transfer" data-part="root" />
))

Transfer.displayName = 'Transfer'

export interface TransferPanelBaseProps extends PolymorphicProps {}
export interface TransferPanelProps extends HTMLProps<'div'>, TransferPanelBaseProps {}

export const TransferPanel = forwardRef<HTMLDivElement, TransferPanelProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="transfer" data-part="panel" />
))

TransferPanel.displayName = 'TransferPanel'

export interface TransferListBaseProps extends PolymorphicProps {}
export interface TransferListProps extends HTMLProps<'ul'>, TransferListBaseProps {}

export const TransferList = forwardRef<HTMLUListElement, TransferListProps>((props, ref) => (
  <codesign.ul {...props} ref={ref} data-scope="transfer" data-part="list" />
))

TransferList.displayName = 'TransferList'

export interface TransferItemBaseProps extends PolymorphicProps {}
export interface TransferItemProps extends HTMLProps<'li'>, TransferItemBaseProps {}

export const TransferItem = forwardRef<HTMLLIElement, TransferItemProps>((props, ref) => (
  <codesign.li {...props} ref={ref} data-scope="transfer" data-part="item" />
))

TransferItem.displayName = 'TransferItem'

export interface TransferActionsBaseProps extends PolymorphicProps {}
export interface TransferActionsProps extends HTMLProps<'div'>, TransferActionsBaseProps {}

export const TransferActions = forwardRef<HTMLDivElement, TransferActionsProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="transfer" data-part="actions" />
))

TransferActions.displayName = 'TransferActions'
