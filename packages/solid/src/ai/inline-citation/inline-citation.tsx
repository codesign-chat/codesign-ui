import { Show, splitProps } from 'solid-js'
import type { JSX } from 'solid-js'
import { Carousel } from '../../components/carousel/index.tsx'
import { HoverCard } from '../../components/hover-card/index.tsx'

const SCOPE = 'inline-citation'

export type InlineCitationProps = JSX.HTMLAttributes<HTMLSpanElement>

export function InlineCitation(props: InlineCitationProps) {
  return <span data-scope={SCOPE} data-part="root" {...props} />
}

export type InlineCitationTextProps = JSX.HTMLAttributes<HTMLSpanElement>

export function InlineCitationText(props: InlineCitationTextProps) {
  return <span data-scope={SCOPE} data-part="text" {...props} />
}

export type InlineCitationCardProps = Parameters<typeof HoverCard.Root>[0]

export function InlineCitationCard(props: InlineCitationCardProps) {
  return <HoverCard.Root closeDelay={0} openDelay={0} {...props} />
}

export type InlineCitationCardTriggerProps = JSX.HTMLAttributes<HTMLSpanElement> & {
  sources: string[]
}

export function InlineCitationCardTrigger(props: InlineCitationCardTriggerProps) {
  const [local, rest] = splitProps(props, ['sources'])
  const label = () => {
    const first = local.sources[0]
    if (!first) return 'unknown'
    const host = new URL(first).hostname
    return local.sources.length > 1 ? `${host} +${local.sources.length - 1}` : host
  }

  return (
    <HoverCard.Trigger
      asChild={(triggerProps) => (
        <span {...triggerProps} data-scope={SCOPE} data-part="citation-badge" {...rest}>
          {label()}
        </span>
      )}
    />
  )
}

export type InlineCitationCardBodyProps = JSX.HTMLAttributes<HTMLDivElement>

export function InlineCitationCardBody(props: InlineCitationCardBodyProps) {
  return (
    <HoverCard.Positioner>
      <HoverCard.Content data-scope={SCOPE} data-part="card-body" {...props} />
    </HoverCard.Positioner>
  )
}

export type InlineCitationCarouselProps = Parameters<typeof Carousel.Root>[0]

export function InlineCitationCarousel(props: InlineCitationCarouselProps) {
  return <Carousel.Root data-scope={SCOPE} data-part="carousel" {...props} />
}

export type InlineCitationCarouselContentProps = Parameters<typeof Carousel.ItemGroup>[0]

export function InlineCitationCarouselContent(props: InlineCitationCarouselContentProps) {
  return <Carousel.ItemGroup data-scope={SCOPE} data-part="carousel-content" {...props} />
}

export type InlineCitationCarouselItemProps = Parameters<typeof Carousel.Item>[0]

export function InlineCitationCarouselItem(props: InlineCitationCarouselItemProps) {
  return <Carousel.Item data-scope={SCOPE} data-part="carousel-item" {...props} />
}

export type InlineCitationCarouselHeaderProps = JSX.HTMLAttributes<HTMLDivElement>

export function InlineCitationCarouselHeader(props: InlineCitationCarouselHeaderProps) {
  return <div data-scope={SCOPE} data-part="carousel-header" {...props} />
}

export type InlineCitationCarouselIndexProps = Parameters<typeof Carousel.ProgressText>[0]

export function InlineCitationCarouselIndex(props: InlineCitationCarouselIndexProps) {
  return <Carousel.ProgressText data-scope={SCOPE} data-part="carousel-index" {...props} />
}

export type InlineCitationCarouselPrevProps = Parameters<typeof Carousel.PrevTrigger>[0]

export function InlineCitationCarouselPrev(props: InlineCitationCarouselPrevProps) {
  return <Carousel.PrevTrigger data-scope={SCOPE} data-part="carousel-prev" {...props} />
}

export type InlineCitationCarouselNextProps = Parameters<typeof Carousel.NextTrigger>[0]

export function InlineCitationCarouselNext(props: InlineCitationCarouselNextProps) {
  return <Carousel.NextTrigger data-scope={SCOPE} data-part="carousel-next" {...props} />
}

export type InlineCitationSourceProps = JSX.HTMLAttributes<HTMLDivElement> & {
  description?: string
  title?: string
  url?: string
}

export function InlineCitationSource(props: InlineCitationSourceProps) {
  const [local, rest] = splitProps(props, ['description', 'title', 'url', 'children'])
  return (
    <div data-scope={SCOPE} data-part="source" {...rest}>
      <Show when={local.title}>
        <h4 data-scope={SCOPE} data-part="source-title">
          {local.title}
        </h4>
      </Show>
      <Show when={local.url}>
        <p data-scope={SCOPE} data-part="source-url">
          {local.url}
        </p>
      </Show>
      <Show when={local.description}>
        <p data-scope={SCOPE} data-part="source-description">
          {local.description}
        </p>
      </Show>
      {local.children}
    </div>
  )
}

export type InlineCitationQuoteProps = JSX.HTMLAttributes<HTMLQuoteElement>

export function InlineCitationQuote(props: InlineCitationQuoteProps) {
  return <blockquote data-scope={SCOPE} data-part="quote" {...props} />
}
