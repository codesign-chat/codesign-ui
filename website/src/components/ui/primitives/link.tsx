import { codesign } from '@codesign-ui/react/factory'
import { styled } from 'styled-system/jsx'
import { link } from 'styled-system/recipes'
import type { ComponentProps } from 'styled-system/types'

export type LinkProps = ComponentProps<typeof LinkComponent>
const LinkComponent = styled(codesign.a, link)

export const Link = (props: LinkProps) => {
  const href = props.href
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))

  if (isInternalLink) {
    return <LinkComponent {...props} />
  }

  return <LinkComponent target="_blank" rel="noopener" {...props} />
}
