'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../../components/factory.ts'

export interface StatusTextBaseProps extends PolymorphicProps {}
export interface StatusTextProps extends HTMLProps<'span'>, StatusTextBaseProps {}

export const StatusText = forwardRef<HTMLSpanElement, StatusTextProps>((props, ref) => (
  <codesign.span {...props} ref={ref} data-scope="status-text" data-part="root" />
))

StatusText.displayName = 'StatusText'

export interface StatusTextIndicatorBaseProps extends PolymorphicProps {}
export interface StatusTextIndicatorProps extends HTMLProps<'span'>, StatusTextIndicatorBaseProps {}

export const StatusTextIndicator = forwardRef<HTMLSpanElement, StatusTextIndicatorProps>((props, ref) => (
  <codesign.span {...props} ref={ref} data-scope="status-text" data-part="indicator" />
))

StatusTextIndicator.displayName = 'StatusTextIndicator'
