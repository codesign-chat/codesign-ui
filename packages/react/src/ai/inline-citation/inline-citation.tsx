import type { ComponentProps } from 'react'
import { Carousel } from '../../components/carousel/index.ts'
import { HoverCard } from '../../components/hover-card/index.ts'

export type InlineCitationProps = ComponentProps<'span'>

export function InlineCitation(props: InlineCitationProps) {
  return <span data-scope="inline-citation" data-part="root" {...props} />
}

export type InlineCitationTextProps = ComponentProps<'span'>

export function InlineCitationText(props: InlineCitationTextProps) {
  return <span data-scope="inline-citation" data-part="text" {...props} />
}

export type InlineCitationCardProps = ComponentProps<typeof HoverCard.Root>

export function InlineCitationCard(props: InlineCitationCardProps) {
  return <HoverCard.Root closeDelay={0} openDelay={0} {...props} />
}

export type InlineCitationCardTriggerProps = Omit<ComponentProps<'span'>, 'children'> & {
  sources: string[]
}

export function InlineCitationCardTrigger({ sources, ...props }: InlineCitationCardTriggerProps) {
  return (
    <HoverCard.Trigger asChild>
      <span data-scope="inline-citation" data-part="citation-badge" {...props}>
        {sources[0] ? (
          <>
            {new URL(sources[0]).hostname} {sources.length > 1 && `+${sources.length - 1}`}
          </>
        ) : (
          'unknown'
        )}
      </span>
    </HoverCard.Trigger>
  )
}

export type InlineCitationCardBodyProps = ComponentProps<typeof HoverCard.Content>

export function InlineCitationCardBody(props: InlineCitationCardBodyProps) {
  return (
    <HoverCard.Positioner>
      <HoverCard.Content data-scope="inline-citation" data-part="card-body" {...props} />
    </HoverCard.Positioner>
  )
}

export type InlineCitationCarouselProps = ComponentProps<typeof Carousel.Root>

export function InlineCitationCarousel(props: InlineCitationCarouselProps) {
  return <Carousel.Root data-scope="inline-citation" data-part="carousel" {...props} />
}

export type InlineCitationCarouselContentProps = ComponentProps<typeof Carousel.ItemGroup>

export function InlineCitationCarouselContent(props: InlineCitationCarouselContentProps) {
  return <Carousel.ItemGroup data-part="carousel-content" {...props} />
}

export type InlineCitationCarouselItemProps = ComponentProps<typeof Carousel.Item>

export function InlineCitationCarouselItem(props: InlineCitationCarouselItemProps) {
  return <Carousel.Item data-scope="inline-citation" data-part="carousel-item" {...props} />
}

export type InlineCitationCarouselHeaderProps = ComponentProps<'div'>

export function InlineCitationCarouselHeader(props: InlineCitationCarouselHeaderProps) {
  return <div data-scope="inline-citation" data-part="carousel-header" {...props} />
}

export type InlineCitationCarouselIndexProps = ComponentProps<typeof Carousel.ProgressText>

export function InlineCitationCarouselIndex(props: InlineCitationCarouselIndexProps) {
  return <Carousel.ProgressText data-scope="inline-citation" data-part="carousel-index" {...props} />
}

export type InlineCitationCarouselPrevProps = ComponentProps<typeof Carousel.PrevTrigger>

export function InlineCitationCarouselPrev(props: InlineCitationCarouselPrevProps) {
  return <Carousel.PrevTrigger data-scope="inline-citation" data-part="carousel-prev" {...props} />
}

export type InlineCitationCarouselNextProps = ComponentProps<typeof Carousel.NextTrigger>

export function InlineCitationCarouselNext(props: InlineCitationCarouselNextProps) {
  return <Carousel.NextTrigger data-scope="inline-citation" data-part="carousel-next" {...props} />
}

export type InlineCitationSourceProps = ComponentProps<'div'> & {
  title?: string
  url?: string
  description?: string
}

export function InlineCitationSource({ title, url, description, children, ...props }: InlineCitationSourceProps) {
  return (
    <div data-scope="inline-citation" data-part="source" {...props}>
      {title && <h4 data-part="source-title">{title}</h4>}
      {url && <p data-part="source-url">{url}</p>}
      {description && <p data-part="source-description">{description}</p>}
      {children}
    </div>
  )
}

export type InlineCitationQuoteProps = ComponentProps<'blockquote'>

export function InlineCitationQuote(props: InlineCitationQuoteProps) {
  return <blockquote data-scope="inline-citation" data-part="quote" {...props} />
}
