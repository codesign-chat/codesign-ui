'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../../components/factory.ts'

export interface KpiRootBaseProps extends PolymorphicProps {}
export interface KpiRootProps extends HTMLProps<'div'>, KpiRootBaseProps {}

export const KpiRoot = forwardRef<HTMLDivElement, KpiRootProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="kpi" data-part="root" />
))

KpiRoot.displayName = 'KpiRoot'

export interface KpiLabelBaseProps extends PolymorphicProps {}
export interface KpiLabelProps extends HTMLProps<'span'>, KpiLabelBaseProps {}

export const KpiLabel = forwardRef<HTMLSpanElement, KpiLabelProps>((props, ref) => (
  <codesign.span {...props} ref={ref} data-scope="kpi" data-part="label" />
))

KpiLabel.displayName = 'KpiLabel'

export interface KpiValueBaseProps extends PolymorphicProps {}
export interface KpiValueProps extends HTMLProps<'strong'>, KpiValueBaseProps {}

export const KpiValue = forwardRef<HTMLElement, KpiValueProps>((props, ref) => (
  <codesign.strong {...props} ref={ref} data-scope="kpi" data-part="value" />
))

KpiValue.displayName = 'KpiValue'

export interface KpiDeltaBaseProps extends PolymorphicProps {}
export interface KpiDeltaProps extends HTMLProps<'span'>, KpiDeltaBaseProps {}

export const KpiDelta = forwardRef<HTMLSpanElement, KpiDeltaProps>((props, ref) => (
  <codesign.span {...props} ref={ref} data-scope="kpi" data-part="delta" />
))

KpiDelta.displayName = 'KpiDelta'
