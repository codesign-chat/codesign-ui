'use client'
import { forwardRef } from 'react'
import { Button } from './button'
import { IconButton } from './icon-button'
import * as CodesignPagination from './primitives/pagination'

export interface PaginationProps extends CodesignPagination.RootProps {}

export const Pagination = forwardRef<HTMLElement, PaginationProps>((props, ref) => {
  return (
    <CodesignPagination.Root ref={ref} {...props}>
      <CodesignPagination.PrevTrigger asChild>
        <IconButton variant="ghost" aria-label="Next Page">
          <ChevronLeftIcon />
        </IconButton>
      </CodesignPagination.PrevTrigger>
      <CodesignPagination.Context>
        {(pagination) =>
          pagination.pages.map((page, index) =>
            page.type === 'page' ? (
              <CodesignPagination.Item key={index} {...page} asChild>
                <Button variant={{ base: 'outline', _selected: 'solid' }} _selected={{ colorPalette: 'coral' }}>
                  {page.value}
                </Button>
              </CodesignPagination.Item>
            ) : (
              <CodesignPagination.Ellipsis key={index} index={index}>
                &#8230;
              </CodesignPagination.Ellipsis>
            ),
          )
        }
      </CodesignPagination.Context>
      <CodesignPagination.NextTrigger asChild>
        <IconButton variant="ghost" aria-label="Next Page">
          <ChevronRightIcon />
        </IconButton>
      </CodesignPagination.NextTrigger>
    </CodesignPagination.Root>
  )
})

Pagination.displayName = 'Pagination'

const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <title>Chevron Left Icon</title>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m15 18l-6-6l6-6"
    />
  </svg>
)

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <title>Chevron Right Icon</title>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m9 18l6-6l-6-6"
    />
  </svg>
)
