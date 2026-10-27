'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../../components/factory.ts'

export interface MiniCalendarBaseProps extends PolymorphicProps {}
export interface MiniCalendarProps extends HTMLProps<'div'>, MiniCalendarBaseProps {}

export const MiniCalendar = forwardRef<HTMLDivElement, MiniCalendarProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="mini-calendar" data-part="root" />
))

MiniCalendar.displayName = 'MiniCalendar'

export interface MiniCalendarGridBaseProps extends PolymorphicProps {}
export interface MiniCalendarGridProps extends HTMLProps<'div'>, MiniCalendarGridBaseProps {}

export const MiniCalendarGrid = forwardRef<HTMLDivElement, MiniCalendarGridProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="mini-calendar" data-part="grid" />
))

MiniCalendarGrid.displayName = 'MiniCalendarGrid'

export interface MiniCalendarDayBaseProps extends PolymorphicProps {}
export interface MiniCalendarDayProps extends HTMLProps<'button'>, MiniCalendarDayBaseProps {}

export const MiniCalendarDay = forwardRef<HTMLButtonElement, MiniCalendarDayProps>((props, ref) => (
  <codesign.button {...props} ref={ref} data-scope="mini-calendar" data-part="day" />
))

MiniCalendarDay.displayName = 'MiniCalendarDay'
