'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../../components/factory.ts'

export interface TimePickerBaseProps extends PolymorphicProps {}
export interface TimePickerProps extends HTMLProps<'div'>, TimePickerBaseProps {}

export const TimePicker = forwardRef<HTMLDivElement, TimePickerProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="time-picker" data-part="root" />
))

TimePicker.displayName = 'TimePicker'

export interface TimePickerInputBaseProps extends PolymorphicProps {}
export interface TimePickerInputProps extends HTMLProps<'input'>, TimePickerInputBaseProps {}

export const TimePickerInput = forwardRef<HTMLInputElement, TimePickerInputProps>((props, ref) => (
  <codesign.input {...props} ref={ref} data-scope="time-picker" data-part="input" />
))

TimePickerInput.displayName = 'TimePickerInput'

export interface TimePickerTriggerBaseProps extends PolymorphicProps {}
export interface TimePickerTriggerProps extends HTMLProps<'button'>, TimePickerTriggerBaseProps {}

export const TimePickerTrigger = forwardRef<HTMLButtonElement, TimePickerTriggerProps>((props, ref) => (
  <codesign.button {...props} ref={ref} data-scope="time-picker" data-part="trigger" />
))

TimePickerTrigger.displayName = 'TimePickerTrigger'

export interface TimePickerContentBaseProps extends PolymorphicProps {}
export interface TimePickerContentProps extends HTMLProps<'div'>, TimePickerContentBaseProps {}

export const TimePickerContent = forwardRef<HTMLDivElement, TimePickerContentProps>((props, ref) => (
  <codesign.div {...props} ref={ref} data-scope="time-picker" data-part="content" />
))

TimePickerContent.displayName = 'TimePickerContent'
