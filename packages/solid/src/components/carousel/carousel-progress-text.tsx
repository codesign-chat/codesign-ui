import { createMemo } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, codesign } from '../factory.tsx'
import { carouselAnatomy } from './carousel.anatomy.ts'
import { useCarouselContext } from './use-carousel-context.ts'

const parts = carouselAnatomy.build()

export interface CarouselProgressTextBaseProps extends PolymorphicProps<'span'> {}
export interface CarouselProgressTextProps extends HTMLProps<'span'>, CarouselProgressTextBaseProps {}

export const CarouselProgressText = (props: CarouselProgressTextProps) => {
  const api = useCarouselContext()

  const progressText = createMemo(() => {
    const currentPage = api().page + 1
    const totalPages = api().pageSnapPoints.length
    return `${currentPage} / ${totalPages}`
  })

  return (
    <codesign.span {...parts.progressText.attrs} {...props}>
      {props.children || progressText()}
    </codesign.span>
  )
}
