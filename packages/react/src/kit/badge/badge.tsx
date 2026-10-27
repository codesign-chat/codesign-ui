'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../../components/factory.ts'

export interface BadgeBaseProps extends PolymorphicProps {}
export interface BadgeProps extends HTMLProps<'span'>, BadgeBaseProps {}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => (
  <codesign.span {...props} ref={ref} data-scope="badge" data-part="root" />
))

Badge.displayName = 'Badge'
