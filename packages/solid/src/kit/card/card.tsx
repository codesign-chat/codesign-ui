import type { JSX } from 'solid-js'

export type CardProps = JSX.HTMLAttributes<HTMLDivElement>

export function Card(props: CardProps) {
  return <div data-scope="card" data-part="root" {...props} />
}

export type CardHeaderProps = JSX.HTMLAttributes<HTMLDivElement>

export function CardHeader(props: CardHeaderProps) {
  return <div data-scope="card" data-part="header" {...props} />
}

export type CardTitleProps = JSX.HTMLAttributes<HTMLHeadingElement>

export function CardTitle(props: CardTitleProps) {
  return <h3 data-scope="card" data-part="title" {...props} />
}

export type CardDescriptionProps = JSX.HTMLAttributes<HTMLParagraphElement>

export function CardDescription(props: CardDescriptionProps) {
  return <p data-scope="card" data-part="description" {...props} />
}

export type CardContentProps = JSX.HTMLAttributes<HTMLDivElement>

export function CardContent(props: CardContentProps) {
  return <div data-scope="card" data-part="content" {...props} />
}

export type CardFooterProps = JSX.HTMLAttributes<HTMLDivElement>

export function CardFooter(props: CardFooterProps) {
  return <div data-scope="card" data-part="footer" {...props} />
}
