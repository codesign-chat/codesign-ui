'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../../components/factory.ts'

export interface TimelineBaseProps extends PolymorphicProps {}
export interface TimelineProps extends HTMLProps<'ol'>, TimelineBaseProps {}

export const Timeline = forwardRef<HTMLOListElement, TimelineProps>((props, ref) => (
  <codesign.ol {...props} ref={ref} data-scope="timeline" data-part="root" />
))

Timeline.displayName = 'Timeline'

export interface TimelineItemBaseProps extends PolymorphicProps {}
export interface TimelineItemProps extends HTMLProps<'li'>, TimelineItemBaseProps {}

export const TimelineItem = forwardRef<HTMLLIElement, TimelineItemProps>((props, ref) => (
  <codesign.li {...props} ref={ref} data-scope="timeline" data-part="item" />
))

TimelineItem.displayName = 'TimelineItem'

export interface TimelineIndicatorBaseProps extends PolymorphicProps {}
export interface TimelineIndicatorProps extends HTMLProps<'span'>, TimelineIndicatorBaseProps {}

export const TimelineIndicator = forwardRef<HTMLSpanElement, TimelineIndicatorProps>((props, ref) => (
  <codesign.span {...props} ref={ref} data-scope="timeline" data-part="indicator" />
))

TimelineIndicator.displayName = 'TimelineIndicator'

export interface TimelineContentBaseProps extends PolymorphicProps {}
export interface TimelineContentProps extends HTMLProps<'div'>, TimelineContentBaseProps {}

export const TimelineContent = forwardRef<HTMLDivElement, TimelineContentProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="timeline" data-part="content" />
))

TimelineContent.displayName = 'TimelineContent'
