import type { MetadataRoute } from 'next'
import { fetchExamples } from '~/lib/examples'
import { getSidebarGroups } from '~/lib/sidebar'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const docsPages = getSidebarGroups()
    .flatMap((group) => group.items)
    .map((page) => ({ url: `https://codesign.chat/docs/${page.slug}` }))

  const examples = await fetchExamples()
  const examplePages = examples.map((example) => ({ url: `https://codesign.chat/examples/${example}` }))

  return [{ url: 'https://codesign.chat' }, ...docsPages, ...examplePages]
}
