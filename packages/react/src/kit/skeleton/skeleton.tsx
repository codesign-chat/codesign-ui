'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../../components/factory.ts'

export interface SkeletonBaseProps extends PolymorphicProps {}
export interface SkeletonProps extends HTMLProps<'div'>, SkeletonBaseProps {}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="skeleton" data-part="root" />
))

Skeleton.displayName = 'Skeleton'
