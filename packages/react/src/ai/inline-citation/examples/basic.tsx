import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import {
  InlineCitation,
  InlineCitationCard,
  InlineCitationCardBody,
  InlineCitationCardTrigger,
  InlineCitationCarousel,
  InlineCitationCarouselContent,
  InlineCitationCarouselHeader,
  InlineCitationCarouselIndex,
  InlineCitationCarouselItem,
  InlineCitationCarouselNext,
  InlineCitationCarouselPrev,
  InlineCitationQuote,
  InlineCitationSource,
  InlineCitationText,
} from '../inline-citation.tsx'

const SOURCES = [
  {
    description: 'The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris.',
    title: 'Eiffel Tower',
    url: 'https://en.wikipedia.org/wiki/Eiffel_Tower',
  },
  {
    description: 'Official visitor information, opening hours and ticket prices.',
    title: 'Tours & tickets',
    url: 'https://www.toureiffel.example',
  },
]

export function Basic() {
  return (
    <InlineCitation>
      <InlineCitationText>The Eiffel Tower</InlineCitationText>
      <InlineCitationCard>
        <InlineCitationCardTrigger sources={SOURCES.map((source) => source.url)} />
        <InlineCitationCardBody>
          <InlineCitationCarousel slideCount={SOURCES.length}>
            <InlineCitationCarouselHeader>
              <InlineCitationCarouselPrev>
                <ArrowLeftIcon size={14} />
              </InlineCitationCarouselPrev>
              <InlineCitationCarouselIndex />
              <InlineCitationCarouselNext>
                <ArrowRightIcon size={14} />
              </InlineCitationCarouselNext>
            </InlineCitationCarouselHeader>
            <InlineCitationCarouselContent>
              {SOURCES.map((source, index) => (
                <InlineCitationCarouselItem index={index} key={source.url}>
                  <InlineCitationSource description={source.description} title={source.title} url={source.url} />
                  <InlineCitationQuote>{source.description}</InlineCitationQuote>
                </InlineCitationCarouselItem>
              ))}
            </InlineCitationCarouselContent>
          </InlineCitationCarousel>
        </InlineCitationCardBody>
      </InlineCitationCard>
    </InlineCitation>
  )
}
