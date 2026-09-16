'use client'
import { type ReactNode, forwardRef } from 'react'
import * as CodesignSlider from './primitives/slider'

export interface SliderProps extends CodesignSlider.RootProps {
  children?: ReactNode
  marks?: {
    value: number
    label?: ReactNode
  }[]
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>((props, ref) => {
  const { children, marks, ...rootProps } = props

  return (
    <CodesignSlider.Root ref={ref} {...rootProps}>
      <CodesignSlider.Context>
        {(api) => (
          <>
            {children && <CodesignSlider.Label>{children}</CodesignSlider.Label>}
            <CodesignSlider.Control>
              <CodesignSlider.Track>
                <CodesignSlider.Range />
              </CodesignSlider.Track>
              {api.value.map((_, index) => (
                <CodesignSlider.Thumb key={index} index={index}>
                  <CodesignSlider.HiddenInput />
                </CodesignSlider.Thumb>
              ))}
            </CodesignSlider.Control>
            {props.marks && (
              <CodesignSlider.MarkerGroup>
                {props.marks.map((mark) => (
                  <CodesignSlider.Marker key={mark.value} value={mark.value}>
                    {mark.label}
                  </CodesignSlider.Marker>
                ))}
              </CodesignSlider.MarkerGroup>
            )}
          </>
        )}
      </CodesignSlider.Context>
    </CodesignSlider.Root>
  )
})

Slider.displayName = 'Slider'
