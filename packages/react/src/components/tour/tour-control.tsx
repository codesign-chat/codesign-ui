'use client'

import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.ts'
import { tourAnatomy } from './tour.anatomy.ts'

export interface TourControlBaseProps extends PolymorphicProps {}
export interface TourControlProps extends HTMLProps<'div'>, TourControlBaseProps {}

export const TourControl = forwardRef<HTMLDivElement, TourControlProps>((props, ref) => (
  <codesign.div {...tourAnatomy.build().control.attrs} {...props} ref={ref} />
))

TourControl.displayName = 'TourControl'
