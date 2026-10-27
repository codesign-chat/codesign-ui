'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../../components/factory.ts'

export interface SpinBaseProps extends PolymorphicProps {}
export interface SpinProps extends HTMLProps<'div'>, SpinBaseProps {}

export const Spin = forwardRef<HTMLDivElement, SpinProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="spin" data-part="root" />
))

Spin.displayName = 'Spin'

export interface SpinIndicatorBaseProps extends PolymorphicProps {}
export interface SpinIndicatorProps extends HTMLProps<'span'>, SpinIndicatorBaseProps {}

export const SpinIndicator = forwardRef<HTMLSpanElement, SpinIndicatorProps>((props, ref) => (
  <codesign.span {...props} ref={ref} data-scope="spin" data-part="indicator" />
))

SpinIndicator.displayName = 'SpinIndicator'

export interface SpinLabelBaseProps extends PolymorphicProps {}
export interface SpinLabelProps extends HTMLProps<'span'>, SpinLabelBaseProps {}

export const SpinLabel = forwardRef<HTMLSpanElement, SpinLabelProps>((props, ref) => (
  <codesign.span {...props} ref={ref} data-scope="spin" data-part="label" />
))

SpinLabel.displayName = 'SpinLabel'
