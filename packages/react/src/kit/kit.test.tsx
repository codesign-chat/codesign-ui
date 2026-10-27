import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import {
  Alert,
  AlertTitle,
  Button,
  ButtonLabel,
  Card,
  CardHeader,
  CardTitle,
  Input,
  Search,
  SearchInput,
  Sheet,
  SheetContent,
  SheetTitle,
} from './index.ts'

describe('screen kit', () => {
  it('renders the action and surface families', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Workspace</CardTitle>
        </CardHeader>
        <Button>
          <ButtonLabel>Save</ButtonLabel>
        </Button>
      </Card>,
    )

    expect(screen.getByText('Workspace')).toBeVisible()
    expect(screen.getByText('Save')).toBeVisible()
  })

  it('renders input and search anatomy', () => {
    render(
      <>
        <Input aria-label="Email" data-testid="input" />
        <Search>
          <SearchInput aria-label="Search" data-testid="search" />
        </Search>
      </>,
    )

    expect(screen.getByTestId('input')).toHaveAttribute('data-scope', 'input')
    expect(screen.getByTestId('search')).toHaveAttribute('data-scope', 'search')
  })

  it('renders overlay and feedback parts', () => {
    render(
      <>
        <Alert data-testid="alert">
          <AlertTitle>Heads up</AlertTitle>
        </Alert>
        <Sheet>
          <SheetContent>
            <SheetTitle>Filters</SheetTitle>
          </SheetContent>
        </Sheet>
      </>,
    )

    expect(screen.getByTestId('alert')).toHaveAttribute('data-part', 'root')
    expect(screen.getByText('Filters')).toBeVisible()
  })
})
